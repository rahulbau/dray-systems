const db = require('../../../mongoLib');
const {
    logger,
    responses,
    constants
} = require('../../../util');
const User = require('../../authentication/models/User');
const commonFunctions = require("../../../util/commonFunctions");
const UserAction = require('../models/userAction');


async function addUserFeedback(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        req.body.userId = req.body.userId || req.user._id;
        let feedback = new UserAction.feedback(req.body);
        feedback = await feedback.save();
        return responses.actionCompleteResponse(res, languageCode, feedback, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}


async function addSupportRequest(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        req.body.userId = req.body.userId || req.user._id;
        let supportRequest = new UserAction.support(req.body);
        supportRequest = await supportRequest.save();
        return responses.actionCompleteResponse(res, languageCode, supportRequest, "", constants.responseMessageCode.ACTION_COMPLETE);

    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}


async function addLabTest(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        req.body.userId = req.body.userId || req.user._id;
        let labTest = new LabTest(req.body);
        labTest = await labTest.save();
        return responses.actionCompleteResponse(res, languageCode, labTest, "", constants.responseMessageCode.ACTION_COMPLETE);

    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function addEth(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        req.body.userId = req.body.userId || req.user._id;
        let addEth = new Eth(req.body);
        addEth = await addEth.save();
        return responses.actionCompleteResponse(res, languageCode, addEth, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}


async function getEHR(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const skip = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const userEHR = await Eth.find({
            userId: req.query.userId || req.user._id
        }, {}, {
            skip,
            limit
        }).sort({
            createdAt: -1
        });
        return responses.actionCompleteResponse(res, languageCode, userEHR, "", constants.responseMessageCode.ACTION_COMPLETE);
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


async function addPastHistory(req,res){
    const languageCode =req.query.languageCode || 'en';
    try{
        req.body.userId = req.body.userId || req.user._id;
        let pastHistory = new PastHistory(req.body);
        pastHistory = await pastHistory.save();
        return responses.actionCompleteResponse(res, languageCode, pastHistory, "", constants.responseMessageCode.ACTION_COMPLETE);
    }catch( e ){
        logger.error(e);
        return responses.sendError(res,languageCode,{},"",e)

    }
}

async function addInsurancePolicy(req,res){
    const languageCode =req.query.languageCode || 'en';
    try{
        req.body.userId = req.body.userId || req.user._id;
        let insurancePolicy = new InsurancePolicy(req.body);
        insurancePolicy = await insurancePolicy.save();
        return responses.actionCompleteResponse(res, languageCode, insurancePolicy, "", constants.responseMessageCode.ACTION_COMPLETE);
    }catch( e ){
        logger.error(e);
        return responses.sendError(res,languageCode,{},"",e)

    }
}


async function addMenstrualHistory(req,res){
    const languageCode =req.query.languageCode || 'en';
    try{
        req.body.userId = req.body.userId || req.user._id;
        let menstrualHistory = new MenstrualHistory(req.body);
        menstrualHistory = await menstrualHistory.save();
        return responses.actionCompleteResponse(res, languageCode, menstrualHistory, "", constants.responseMessageCode.ACTION_COMPLETE);
    }catch( e ){
        logger.error(e);
        return responses.sendError(res,languageCode,{},"",e)

    }
}


async function addFamilyHistory(req,res){
    const languageCode =req.query.languageCode || 'en';
    try{
        req.body.userId = req.body.userId || req.user._id;
        let familyHistory = new FamilyHistory(req.body);
        familyHistory = await familyHistory.save();
        return responses.actionCompleteResponse(res, languageCode, familyHistory, "", constants.responseMessageCode.ACTION_COMPLETE);
    }catch( e ){
        logger.error(e);
        return responses.sendError(res,languageCode,{},"",e)

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


async function editInsurancePolicy(req,res){
    const languageCode =req.query.languageCode || 'en';
    try{
        const query = {
            _id: req.body.id
        };
        const options = {
            new: true
        };
        const updatedData = await InsurancePolicy.findOneAndUpdate(query, req.body, options);
        return responses.actionCompleteResponse(res, languageCode, updatedData, "", constants.responseMessageCode.ACTION_COMPLETE);
    }catch( e ){
        logger.error(e);
        return responses.sendError(res,languageCode,{},"",e)

    }
}


async function editEhr(req,res){
    const languageCode =req.query.languageCode || 'en';
    try{
        const query = {
            _id: req.body.id
        };
        const options = {
            new: true
        };
        const updatedData = await Eth.findOneAndUpdate(query, req.body, options);
        return responses.actionCompleteResponse(res, languageCode, updatedData, "", constants.responseMessageCode.ACTION_COMPLETE);
    }catch( e ){
        logger.error(e);
        return responses.sendError(res,languageCode,{},"",e)

    }
}


async function editLabTest(req,res){
    const languageCode =req.query.languageCode || 'en';
    try{
        const query = {
            _id: req.body.id
        };
        const options = {
            new: true
        };
        const updatedData = await LabTest.findOneAndUpdate(query, req.body, options);
        return responses.actionCompleteResponse(res, languageCode, updatedData, "", constants.responseMessageCode.ACTION_COMPLETE);
    }catch( e ){
        logger.error(e);
        return responses.sendError(res,languageCode,{},"",e)

    }
}


async function getUserPolicy(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        const skip = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const policyData = await InsurancePolicy.find({
            userId: req.query.userId || req.user._id
        }, {}, {
            skip,
            limit
        }).sort({
            createdAt: -1
        });
        return responses.actionCompleteResponse(res, languageCode, policyData, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}


module.exports = {
    addUserFeedback,
    addSupportRequest,
    editUser,
    getUser,
    getUsers,
}