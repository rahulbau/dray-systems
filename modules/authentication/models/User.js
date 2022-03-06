const { boolean } = require('@hapi/joi');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: String,
    password: {
        type: String,
        default: null
    },
    registrationStep: {
        type: Number,
        default: 1
    },
    role: {
        type: Number,
        default: 1  // -- 1 for employee, 2 -- for job seeker
    },
    userInfo: {
        type: Object,
        default: null
    },
    educationalInfo: {
        type: Object,
        default: null
    },
    emergencyContact: {
        type: Object,
        default: null
    },
    userExperience: {
        type: Object,
        default: null
    },
    notificationFlag: {
        type: Boolean,
        default: false
    },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [95.7129, 37.0902] },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.index({ "location": "2dsphere" });
module.exports = mongoose.model('User', UserSchema);