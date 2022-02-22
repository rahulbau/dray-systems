const { number } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
       role: {
              type: Number,
              default: 2
       },
       organizationDetails: {
              type: Object,
              default: null
       },
       createdAt: { type: Date, default: Date.now }
});

const competenciesSchema = new Schema({
       userId: { type: Schema.Types.ObjectId, ref: 'User' },
       position : { type: String, default: null },
       experience : { type: String, default: null },
       rating : { type: String, default: null },
       topSkills : { type: String, default: null },
       createdAt: { type: Date, default: Date.now }
});

const mediaFolderSchema = new Schema({
       userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
       name : String,
       createdAt: { type: Date, default: Date.now }
});

const mediaUrlSchema = new Schema({
       userId: { type: Schema.Types.ObjectId, ref: 'User' },
       folderId: { type: Schema.Types.ObjectId, ref: 'mediaFolder' },
       mediaUrl : String,
       createdAt: { type: Date, default: Date.now }
});

const organizationSiteSchema = new Schema({
       organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
       cordinatorId: { type: Schema.Types.ObjectId, default: null, ref: 'HRcordinator' },
       name : String,
       openings: Number,
       createdAt: { type: Date, default: Date.now }
});

const HRcordinatorSchema = new Schema({
       organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
       name : String,
       email: String,
       createdAt: { type: Date, default: Date.now }
});

module.exports = {
       organization: mongoose.model('Organization', organizationSchema),
       competencies: mongoose.model('competencies', competenciesSchema),
       mediaFolder: mongoose.model('mediaFolder', mediaFolderSchema),
       mediaUrls: mongoose.model('mediaUrls', mediaUrlSchema),
       organizationSite: mongoose.model('organizationSite', organizationSiteSchema),
       HRcordinator: mongoose.model('HRcordinator', HRcordinatorSchema)

};