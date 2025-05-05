import { io } from 'socket.io-client';
import config from '../config/config.js';
import { alretScriptGet, removeScriptAndUpdateDetails } from "../utils/function.js";
import constant from '../utils/constant.js';
import { sendTelegramMessage } from "../config/telegram.js";
import { processingAlerts } from "../../api/index.js";
import StockAlert from "../model/stockAlertModel.js";
import moment from 'moment';

export const alretScript = [];
export const alretData = [];

export const initializeSocketConnection = () => {
    const socket = io(config.socketServerUrl, {
        transports: ['websocket'],
        rejectUnauthorized: false,
    });

    socket.on('connect', async () => {
        console.log('Connected to socket server');
        await alretScriptGet();
        socket.emit('joinRoom', alretScript);
    });

    socket.on('marketWatch', async (payload) => {
        const data = payload?.data;
        if (!data || alretData.length === 0) return;

        const livePrice = data.LastTradePrice;
        const symbol = data.InstrumentIdentifier;

        // Deduplicate alerts
        const alerts = alretData.filter((item, index, self) =>
                index === self.findIndex(t =>
                    t.script_name === item.script_name && t.price === item.price
                )
        );

        for (const element of alerts) {
            if (element.script_name !== symbol) continue;

            const key = `${element.script_name}-${element.price}`;
            if (processingAlerts.has(key)) continue;

            const shouldTriggerBuy = element.hit_side === constant.HIT_SIDE[0] && element.price >= livePrice;
            const shouldTriggerSell = element.hit_side === constant.HIT_SIDE[1] && element.price <= livePrice;

            if (shouldTriggerBuy || shouldTriggerSell) {
                processingAlerts.add(key);

                const type = shouldTriggerBuy ? 'BUY' : 'SELL';
                const arrow = shouldTriggerBuy ? '📈 📈' : '📉 📉';

                await sendTelegramMessage(`
${type} ALERT ✨

${arrow} ${symbol},
Crossed: ₹${element.price},
Currently At: ₹${livePrice}
For: ${element.alert_for}
Comment: ${element.comment}
                `);

                // Remove from alretScript
                const scriptIndex = alretScript.findIndex(
                    item => item.script_name === element.script_name && item.price === element.price
                );
                if (scriptIndex !== -1) {
                    alretScript.splice(scriptIndex, 1);
                    socket.emit('leaveRoom', element.script_name); // Optional: leave the socket room
                }

                // Update DB
                await StockAlert.findOneAndUpdate(
                    { _id: element._id },
                    { $set: { alert_hit: true, alert_hit_time: moment().format('hh:mm A DD/MMM/YYYY') } }
                );

                // Remove from alretData properly
                const alertIndex = alretData.findIndex(
                    item => item.script_name === element.script_name && item.price === element.price
                );
                if (alertIndex !== -1) {
                    alretData.splice(alertIndex, 1);
                }

                processingAlerts.delete(key);
            }
        }
    });

    socket.on('connect_error', (err) => {
        console.error('Connection Error:', err.message);
    });

    socket.on('disconnect', () => {
        console.warn('Disconnected from socket server');
    });
};
