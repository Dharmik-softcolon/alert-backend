import express from 'express';
import { connectDB } from '../src/config/db.js';
import config from '../src/config/config.js';
import moment from 'moment';
import Route from '../src/routes/index.js';
import {initializeSocketConnection} from '../src/socket/socket.js';
import cors from 'cors';
import cron from 'node-cron';



const app = express();

app.use(cors());

app.use(cors({
    origin: [config.clientUrl, 'http://localhost:3000']
}));

connectDB();

initializeSocketConnection()

export const processingAlerts = new Set();

// Schedule the task to run at 9:15:30 AM daily
cron.schedule('15 15 9 * * *', () => {
    console.log('Running scheduled task at 9:15:15 AM');
    // cron.schedule('*/15 * * * *', () => {
    //     console.log('Running scheduled task every 15 minutes');
        initializeSocketConnection();
    // });
});

app.use(express.json());

app.use('/stocks', Route);

app.get('/', (req, res) => {
    res.send('Stock Alert Server Running');
});

console.log(`CURRANT TIME: [${moment().format('hh:mm A DD/MMM/YYYY')}]`);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

export default app