import StockAlert from '../model/stockAlertModel.js';
import {alretScriptGet} from "../utils/function.js";

// CREATE Alert
export const createAlert = async (req, res) => {
    try {
        const alert = await StockAlert.create(req.body);
        // for update map of script
        await alretScriptGet()
        res.status(201).json(alert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET All Alerts
export const getAllAlerts = async (req, res) => {
    try {
        const alerts = await StockAlert.find({alert_hit:false});
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET Single Alert by ID
export const getAlertById = async (req, res) => {
    try {
        const alert = await StockAlert.findById(req.params.id);
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.status(200).json(alert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE Alert
export const updateAlert = async (req, res) => {
    try {
        const alert = await StockAlert.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.status(200).json(alert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Alert
export const deleteAlert = async (req, res) => {
    try {
        const alert = await StockAlert.findByIdAndDelete(req.params.id);
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.status(200).json({ message: 'Alert deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
