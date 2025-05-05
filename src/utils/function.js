import StockAlert from "../model/stockAlertModel.js";
import {alretScript,alretData} from "../socket/socketClient.js";
import moment from "moment/moment.js";

export const alretScriptGet = async () => {
    const alerts = await StockAlert.find({ alert_hit: false });
    // Clear previous data to avoid duplicates
    alretScript.length = 0;
    alretData.length = 0;
    const scriptNames = alerts.map(item => item.script_name);
    alretScript.push(...scriptNames);
    alretData.push(...alerts);
};


// export const removeScriptAndUpdateDetails = async (scriptName, price, Id) => {
//     alretScript = alretScript.filter(item => !(item.script_name === scriptName && item.price === price));
//
//     // Update Db
//     const updatedAlert = await StockAlert.findOneAndUpdate(
//         { _id: Id  },
//         { $set: { alert_hit: true, alert_hit_time: moment().format('hh:mm A DD/MMM/YYYY') } },
//     );
//     const isScriptExists = updatedArrayData.some(item => item.script_name === scriptName);
//
//      alretData = isScriptExists
//         ? alretData
//         : alretData.filter(name => name !== scriptName);
// };

export const removeScriptAndUpdateDetails = async (scriptName, price, Id) => {

};
