const db = require('../../../mongoLib');
const {
    logger,
    responses,
    constants
} = require('../../../util');
const User = require('../../authentication/models/User');
const Organization = require('../models/organization');
const commonFunctions = require("../../../util/commonFunctions");


async function getOrganizations(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const skip = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        let findObject = {};
        if (req.query.searchString) {
            findObject.name = {$regex: req.query.searchString, $options:'i'};
        }
        const organizations = await Organization.find(findObject, {}, {
            skip,
            limit
        }).sort({
            createdAt: -1
        });
        return responses.actionCompleteResponse(res, languageCode, organizations, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function addOrganizations(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        let feedback = new Organization(req.body);
        feedback = await feedback.save();
        return responses.actionCompleteResponse(res, languageCode, feedback, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function editUser(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const userId = req.body.userId || req.user._id;
        const options = {
            new: true
        };
        let userData = await User.findByIdAndUpdate(userId, {
            $set: req.body.updateBody
        }, options).lean();
        delete userData.password;
        return responses.actionCompleteResponse(res, languageCode, userData, "", constants.responseMessageCode.ACTION_COMPLETE);

    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function getUser(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const query = {
            _id: req.query.userId || req.user._id
        };
        let userData = await User.findOne(query);
        userData = userData.toObject();
        delete userData.userPassword;
        delete userData.accessTokens;
        return responses.actionCompleteResponse(res, languageCode, userData, "", constants.responseMessageCode.ACTION_COMPLETE);

    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}


async function getUsers(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const skip = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const user = await User.find({
            role: 1,
            deactivate : 0
        }, {}, {
            skip,
            limit
        }).sort({
            createdAt: -1
        });
        return responses.actionCompleteResponse(res, languageCode, user, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}



module.exports = {
    editUser,
    getUser,
    getUsers,
    getOrganizations,
    addOrganizations
}