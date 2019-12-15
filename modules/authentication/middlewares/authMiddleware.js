const logger = require('../../../util/logger');
const commonFunctions = require('../../../util/commonFunctions');
const responses = require('../../../util/responses');
const constants = require('../../../util/constants');
const db = require('../../../mongoLib');
const User = require('../models/User');

exports.auth = async function (req, res, next) {
    const languageCode = req.body.language;

    try {
        let userID = null;
        const accessToken = req.headers.access_token;
          await commonFunctions.validateAccessToken(accessToken).then((data) => {
            userID = data.userId;
            tokenCreationTime = data.creationDateTime;
        });

        if (!userID) {
            throw constants.responseMessageCode.INVALID_ACCESS_TOKEN;
        }
       
        const user = await User.findOne({
            _id : userID
        });
        if (!user) {
            throw constants.responseMessageCode.NO_DATA_FOUND;
        } else {
             const validateOpts = {
                userId: user._id,
                user,
                accessToken
            };
            await commonFunctions.validateUser(validateOpts);
            req.user = user;
            next();
        }
    } catch (error) {
        logger.error(error);
        if (error.ERROR) {
            return responses.sendError(res, languageCode, {}, "", error.ERROR.errno);
        }
        return responses.sendError(res, languageCode, {}, "", error);
    }
};
