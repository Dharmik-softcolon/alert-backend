import mongoose from 'mongoose';
import config from './config.js';
import StockAlert from "../model/stockAlertModel.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log('MONGODB CONNECTED SUCESSFULLY');
        await syncAllModel()
    } catch (error) {
        console.error('MONGODB CONNECTION FAILED:', error.message);
        process.exit(1);
    }
};

const syncAllModel = async () => {
    try {
        await Promise.all([
            StockAlert.syncIndexes(),
        ])
    } catch (e) {
        logger.error(e)
    }
}