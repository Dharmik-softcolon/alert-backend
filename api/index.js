import express from 'express';
import { connectDB } from '../src/config/db.js';
// import config from '../src/config/config.js';
import moment from 'moment';
import Route from '../src/routes/index.js';

const app = express();

connectDB();

app.use(express.json());

app.use('/api/stocks', Route);

app.get('/', (req, res) => {
    res.send('Stock Alert Server Running');
});

console.log(`CURRANT TIME: [${moment().format('hh:mm A DD/MMM/YYYY')}]`);

// app.listen(config.port, () => {
//     console.log(`Server running on port ${config.port}`);
// });

export default app