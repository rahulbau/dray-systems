const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
       // userId: Schema.Types.ObjectId,
       name : String,
       createdAt: { type: Date, default: Date.now }
});

const competenciesSchema = new Schema({
       userId: Schema.Types.ObjectId,
       position : { type: String, default: null },
       experience : { type: String, default: null },
       rating : { type: String, default: null },
       topSkills : { type: String, default: null },
       createdAt: { type: Date, default: Date.now }
});

module.exports = {
       organization: mongoose.model('Organization', organizationSchema),
       competencies: mongoose.model('competencies', competenciesSchema)
};