import config from "./config.js";
import axios from "axios";

export const sendTelegramMessage = async (message) => {
    const url = `${config.telegram.telegramUrl}/bot${config.telegram.token}/sendMessage`;
    try {
        await axios.post(url, {
            chat_id: config.telegram.chatId,
            text: message,
        });
    } catch (error) {
        console.error('Telegram Error:', error.message);
    }
};