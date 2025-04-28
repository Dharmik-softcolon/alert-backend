import mongoose from 'mongoose';
import constant from '../utils/constant.js';

const stockAlertSchema = new mongoose.Schema({
    script_name: {
        type: String,
        required: true,
    },
    hit_side: {
        type: String,
        enum: constant.HIT_SIDE,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    alert_type: {
        type: String,
        default: constant.ALERT_TYPES[0],
        enum: constant.ALERT_TYPES,
        immutable: true,
    },
    alert_for: {
        type: String,
        enum: constant.ALERT_FOR,
        immutable: true,
    },
    alert_hit:{
        type: Boolean,
        required: true,
        default: false
    },
    alert_hit_time:{
        type: Date,
    },
    comment: {
        type: String
    },
}, {
    timestamps: true,
});

const StockAlert = mongoose.model('StockAlert', stockAlertSchema);

export default StockAlert;
