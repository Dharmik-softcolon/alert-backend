import express from 'express';
import {createAlert, getAllAlerts, getAlertById, updateAlert, deleteAlert} from '../controllers/stockController.js';

const route = express.Router();

route.post('/', createAlert);
route.get('/get-all', getAllAlerts);
route.get('get/:id', getAlertById);
route.put('update/:id', updateAlert);
route.delete('delete/:id', deleteAlert);

export default route;
