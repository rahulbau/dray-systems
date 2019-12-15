const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addEthSchema = new Schema({
       userId: Schema.Types.ObjectId,
       diseaseName : String,
       detectionDate:String,   
       healthCareProvider : String, 
       doctorInCharge : String, 
       commonName : String, 
       curedDate : String, // optional filled
       testConducted: String, 
       illinessDate: String, 
       document: String, 
       dischargeDate : String,
       icdCode : String,
       createdAt: { type: Date, default: Date.now }
});




module.exports = mongoose.model('addEth', addEthSchema);