import express from 'express';
import { connectDB } from './src/config/db.js';
import config from './src/config/config.js';
import moment from 'moment';
import Route from './src/routes/index.js';
import serverless from 'serverless-http';

const app = express();

connectDB(); // Connect to MongoDB

app.use(express.json());

// Mount routes
app.use('/api/stocks', Route);

app.get('/', (req, res) => {
    res.send('Stock Alert Server Running');
});

console.log(`CURRANT TIME: [${moment().format('hh:mm A DD/MMM/YYYY')}]`);

export const handler = serverless(app);
