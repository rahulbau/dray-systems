const { boolean } = require('@hapi/joi');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: String,
    password: String,
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);