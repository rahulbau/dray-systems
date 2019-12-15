const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OTPSchema = new Schema({
       icd_code: String,
       disease_name: String,
       illness_category: String,
       group: String,
       illness_grade_point: String,
       coverage_condition: String,
       createdAt: {
              type: Date,
              default: Date.now
       }

});

module.exports = {
       icdMaster: mongoose.model('ICD', OTPSchema),
}