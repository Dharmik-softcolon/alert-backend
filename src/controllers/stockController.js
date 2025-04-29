import StockAlert from '../model/stockAlertModel.js';
import constant from '../utils/constant.js';
import {alretScriptGet} from "../utils/function.js";

// CREATE Alert
export const createAlert = async (req, res) => {
    try {
        const data = req.body
        const alert = await StockAlert.create({
            script_name: data?.stockName,
            hit_side: data?.direction,
            price: data?.price,
            alert_for: constant.ALERT_FOR[data?.alertFor],
            comment: data?.comment
        });

        // update map of script
        await alretScriptGet();  // Corrected spelling

        res.status(201).json({
            statusCode: 201,
            message: "Alert created successfully",
            data: alert
        });
    } catch (error) {
        console.error("Error creating alert:", error);
        res.status(400).json({
            statusCode: 400,
            message: "Failed to create alert",
            error: error.message
        });
    }
};


// GET All Alerts
export const getAllAlerts = async (req, res) => {
    try {
        const alerts = await StockAlert.find({ alert_hit: false });

        res.status(200).json({
            statusCode: 200,
            message: "Alerts fetched successfully",
            data: alerts
        });
    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Failed to fetch alerts",
            error: error.message
        });
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
        const updateData = {
            hit_side: req.body.hit_side,
            price: req.body.price,
            alert_for: constant.ALERT_FOR[req.body?.alert_for],
            comment: req.body.comment,
        };
        const alert = await StockAlert.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        if (!alert) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Alert not found',
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: 'Alert updated successfully',
            data: alert,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// DELETE Alert
export const deleteAlert = async (req, res) => {
    try {
        const alert = await StockAlert.findByIdAndDelete(req.params.id);

        if (!alert) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Alert not found',
            });
        }

        return res.status(200).json({
            statusCode: 200,
            message: 'Alert deleted successfully',
            data: alert,
        });
    } catch (error) {
        console.error("Error deleting alert:", error);
        return res.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
};

