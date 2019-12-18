let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    userEmail: {
        type: String,
        default: '',
        unique: true
    },
    userFullName: {
        type: String,
        default: ''
    },
    deactivate: {
        type: Number,
        default: 0
    },
    role: {
        type: Number,
        default: 1
    },
    accessTokens: [String],
    userProfilePic: String,
    userCoverPic: String,
    userPhone: {
        type: String,
        unique: true
    },
    // emailVarified: {
    //     type: Number,
    //     default: 0,
    // },
    // phoneVarified: {
    //     type: Number,
    //     default: 0,
    // },
    userCountry: {
        type: String,
    },
    shopName : String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);