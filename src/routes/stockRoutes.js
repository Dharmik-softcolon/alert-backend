import express from 'express';
import {
    createAlert,
    getAllAlerts,
    getAlertById,
    updateAlert,
    deleteAlert,
    // test
} from '../controllers/stockController.js';

const route = express.Router();

route.post('/create', createAlert);
route.get('/get-all', getAllAlerts);
route.get('/get/:id', getAlertById);
route.put('/update/:id', updateAlert);
route.delete('/delete/:id', deleteAlert);
// route.get('/abc', test);

export default route;
