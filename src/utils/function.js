import StockAlert from "../model/stockAlertModel.js";
import {alretScript,alretData} from "../socket/socket.js";
import moment from "moment/moment.js";

export const alretScriptGet = async () =>{
    const alerts = await StockAlert.find({alert_hit:false});
    const scriptNames = alerts.map(item => item.script_name);
    await alretScript.push(...scriptNames)
    await alretData.push(...alerts)
}

export const removeScriptAndUpdateDetails = async (arrayData, detailArray, scriptName, price, Id) => {
    const updatedArrayData = arrayData.filter(item => !(item.script_name === scriptName && item.price === price));

    // Update Db
    const updatedAlert = await StockAlert.findOneAndUpdate(
        { _id: Id  },
        { $set: { alert_hit: true, alert_hit_time: moment().format('hh:mm A DD/MMM/YYYY') } },
    );
    const isScriptExists = updatedArrayData.some(item => item.script_name === scriptName);

    const updatedDetailArray = isScriptExists
        ? detailArray
        : detailArray.filter(name => name !== scriptName);

    return { updatedArrayData, updatedDetailArray };
};