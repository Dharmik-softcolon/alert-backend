import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 5000,
    mongoUrl: process.env.MONGO_URL,
    clientUrl:process.env.CLIENT_URL,
    telegram: {
        token: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
        telegramUrl:process.env.TELEGRAM_URL
    },
    socketServerUrl: process.env.SOCKET_SERVER_URL,
};
