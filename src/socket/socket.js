import { io } from 'socket.io-client';
import config from '../config/config.js';
import {alretScriptGet, removeScriptAndUpdateDetails} from "../utils/function.js";
import constant from '../utils/constant.js';
import {sendTelegramMessage} from "../config/telegram.js";
export const alretScript = []
export const alretData = []

export const socket = io(config.socketServerUrl, {
    transports: ['websocket'],
    rejectUnauthorized: false,
});

socket.on('connect', async() => {
    console.log('Connected to socket server');
    await alretScriptGet()
    socket.emit('joinRoom', alretScript);
});


socket.on('marketWatch', async(payload) => {
    const data = payload?.data;
    if (alretData.length > 0) {
        for (const element of alretData) {
            if (element.script_name !== data?.InstrumentIdentifier) continue;
            const livePrice = data.LastTradePrice;
            const symbol = data.InstrumentIdentifier;
            if (element.hit_side === constant.HIT_SIDE[0] && element.price <= livePrice) {
                sendTelegramMessage(`
BUY ALERT ✨
 
📈 📈 ${symbol},
Crossed: ₹${element.price},
Currantly At: ₹${livePrice}
For: ${element.alert_for}
Comment: ${element.comment}`);

                await removeScriptAndUpdateDetails(alretScript, alretData, element.script_name, element.price, element._id)
            } else if (element.hit_side === constant.HIT_SIDE[1] && element.price >= livePrice) {
                sendTelegramMessage(`
SELL ALERT ✨

📉 📉 ${symbol},
Crossed: ₹${element.price},
Currantly At: ₹${livePrice}
For: ₹${element.alert_for}
Comment:₹${element.comment}`);

                await removeScriptAndUpdateDetails(alretScript, alretData, element.script_name, element.price, element._id)
            }
        }
    }
});

socket.on('connect_error', (err) => {
    console.error('Connection Error:', err.message);
});

socket.on('disconnect', () => {
    console.warn('Disconnected from socket server');
});