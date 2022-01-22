const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
       // userId: Schema.Types.ObjectId,
       name : String,
       createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Organization', organizationSchema);