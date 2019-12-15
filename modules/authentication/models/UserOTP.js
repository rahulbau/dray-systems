const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OTPSchema = new Schema({
       object: String,
       otp : String,
       type:Number,   // 1- phone
       createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('OTP', OTPSchema);