const db = require('../../../mongoLib');
const {
    logger,
    responses,
    constants
} = require('../../../util');
const User = require('../../authentication/models/User');
const UserCoreModel = require('../models/userCore');
const commonFunctions = require("../../../util/commonFunctions");


async function getOrganizations(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const skip = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        let findObject = {};
        if (req.query.searchString) {
            findObject["organizationDetails.name"] = {$regex: req.query.searchString, $options:'i'};
        }
        const organizations = await UserCoreModel.organization.find(findObject, {}, {
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
        let organization = new UserCoreModel.organization(req.body);
        organization = await organization.save();
        const payload = {
            userId: organization._id
        };
        const accessToken = await commonFunctions.generateJWToken(payload);
        const data = {
            responseData: organization,
            accessToken : accessToken
        };
        return responses.actionCompleteResponse(res, languageCode, data, "", constants.responseMessageCode.ACTION_COMPLETE);
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

async function getCoreCompetencies(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const skip = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const query = {
            userId: req.query.userId || req.user._id
        };
        const competencies = await UserCoreModel.competencies.find(query, {}, {
            skip,
            limit
        }).sort({
            createdAt: -1
        });
        return responses.actionCompleteResponse(res, languageCode, competencies, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function addCoreCompetencies(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        req.body.userId = req.user._id;
        let competencies = new UserCoreModel.competencies(req.body);
        competencies = await competencies.save();
        return responses.actionCompleteResponse(res, languageCode, competencies, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function addMediaFolders(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        req.body.userId = req.user._id;
        let mediaFolder = new UserCoreModel.mediaFolder(req.body);
        mediaFolder = await mediaFolder.save();
        return responses.actionCompleteResponse(res, languageCode, mediaFolder, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function getMediaFolders(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const skip = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const query = { $or: [ { userId: req.user._id }, { userId: null } ] } 
        const mediaFolder = await UserCoreModel.mediaFolder.find(query, {}, {
            skip,
            limit
        }).sort({
            createdAt: -1
        });
        return responses.actionCompleteResponse(res, languageCode, mediaFolder, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function addMediaInFolder(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        req.body.userId = req.user._id;
        let mediaUrls = new UserCoreModel.mediaUrls(req.body);
        mediaUrls = await mediaUrls.save();
        return responses.actionCompleteResponse(res, languageCode, mediaUrls, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function getMediaFromFolder(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const skip = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const query = {
            folderId: req.query.folderId
        };
        const mediaFolder = await UserCoreModel.mediaUrls.find(query, {}, {
            skip,
            limit
        }).sort({
            createdAt: -1
        });
        return responses.actionCompleteResponse(res, languageCode, mediaFolder, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function verifyOrganizationName(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {        
        let organization = await UserCoreModel.organization.findOne({
            "organizationDetails.name": req.body.name
        }).lean();
        let data = {
            exist: false
        };
        if (organization) {
            data["exist"] = true
        }
        return responses.actionCompleteResponse(res, languageCode, data, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function addSite(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        req.body.organizationId = req.user._id;

        let organizationSite = await UserCoreModel.organizationSite.findOne({
            name: req.body.name
        }).lean();
        if (organizationSite) {
            throw constants.responseMessageCode.USER_ALREADY_EXISTS;
        } else {
            organizationSite = new UserCoreModel.organizationSite(req.body);
            organizationSite = await organizationSite.save();
            return responses.actionCompleteResponse(res, languageCode, organizationSite, "", constants.responseMessageCode.ACTION_COMPLETE);
        }
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function getSite(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const skip = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const query = {
            organizationId: req.query.organizationId || req.user._id
        };
        const organizationSite = await UserCoreModel.organizationSite.find(query, {}, {
            skip,
            limit
        }).sort({
            createdAt: -1
        });
        return responses.actionCompleteResponse(res, languageCode, organizationSite, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}


module.exports = {
    editUser,
    getUser,
    getUsers,
    getCoreCompetencies,
    addCoreCompetencies,
    getOrganizations,
    addOrganizations,
    addMediaFolders,
    getMediaFolders,
    addMediaInFolder,
    getMediaFromFolder,
    verifyOrganizationName,
    addSite,
    getSite
}