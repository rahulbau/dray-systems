const db = require('../../../mongoLib');
const {
    logger,
    responses,
    constants
} = require('../../../util');
const User = require('../models/User');
const OTP = require('../models/UserOTP');
const commonFunctions = require("../../../util/commonFunctions");
const moment = require('moment');
const Bcrypt = require("bcryptjs");
const { addInsurancePolicy } = require('../../user/validators/userValidator');


//****************************************************************************************/
//                               User Register Controller                                //
//****************************************************************************************/
async function registerUser(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        let {
            email,
            password,
            role,
            userInfo,
            educationalInfo,
            emergencyContact
        } = req.body;
            let user = await User.findOne({
                email
            }).lean();
            if (user) {
                throw constants.responseMessageCode.EMAIL_ALREADY_EXISTS;
            } else {
                password = Bcrypt.hashSync(password, 10);
                const userData = new User({
                    email,
                    password,
                    role,
                    userInfo,
                    educationalInfo,
                    emergencyContact
                });
                const user = await userData.save();
                const payload = {
                    userId: user._id
                };
                delete user.password;
                const accessToken = await commonFunctions.generateJWToken(payload);
                const data = {
                    responseData: user,
                    accessToken : accessToken
                };
                return responses.actionCompleteResponse(res, languageCode, data, "", constants.responseMessageCode.ACTION_COMPLETE);
            }
        
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}
//*************************** End of User Register Controller ***************************//




//****************************************************************************************/
//                                 User login Controller                                 //
//****************************************************************************************/
async function loginUser(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        let {
            email,
            password
        } = req.body
            let user = await User.findOne({
                email
            }).lean();
            if (user) {      
                
                let currectPwd = Bcrypt.compareSync(password, user.password)
                if (!currectPwd) {
                    logger.log("INVALID PASSWORD");
                    throw constants.responseMessageCode.INVALID_CREDENTIALS;
                }                    
                const accessToken = await commonFunctions.generateJWToken({userId: user._id});
                delete user.password;
                const data = {
                    responseData: user,
                    accessToken : accessToken
                };
                return responses.actionCompleteResponse(res, languageCode, data, "", constants.responseMessageCode.ACTION_COMPLETE);
            } else {
                logger.log("No user found");
                throw constants.responseMessageCode.ACCOUNT_NOT_REGISTER;
            }
       
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}


async function verifyUser(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        let otpData = await OTP.findOne({
            object: req.body.userPhone,
            type: parseInt(req.body.type) || 1
        });

        if (otpData && otpData.otp == req.body.otp) {
            const starts = moment(otpData.createdAt);
            const ends = moment();

            const duration = moment.duration(ends.diff(starts));

            if (duration._milliseconds / 60000 < 30) {
                await OTP.deleteMany({
                    object: req.body.userPhone,
                    type: parseInt(req.body.type) || 1
                });
                let user = await User.findOne({
                    userPhone: req.body.userPhone
                });
                const payload = {
                    userId: user._id
                };
                const accessToken = await commonFunctions.generateJWToken(payload);
                
                if (user.deactivate == 1) {
                    await User.findByIdAndUpdate(user._id, {
                        $set: {
                            deactivate: 0
                        }
                    });
                }

               
                const data = {
                    responseData: user,
                    accessToken : accessToken
                };
                responses.actionCompleteResponse(res, languageCode, data, "", constants.responseMessageCode.ACTION_COMPLETE);

                // commonFunctions.sendWelcomeEmail({
                //     userEmail: user.userEmail,
                //     uid: user.uid
                // })
                return;
            } else {
                return responses.sendError(res, languageCode, {}, 'OTP has been expired.', 'PARAMETER_MISSING');
            }
        } else {
            return responses.sendError(res, languageCode, {}, 'OTP doesn\'t match.', 'PARAMETER_MISSING');
        }

    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function resendOTP(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {

        //  ----------- send OTP to verify ------------------
        const otp = commonFunctions.generateOTP();
        otpData = new OTP({
            object: req.body.userPhone,
            otp: otp,
            type: parseInt(req.body.type) || 1
        });
        const otp1 = await otpData.save();
        await OTP.deleteMany({
            object: req.body.userPhone,
            '_id': {
                $ne: otp1._id
            }
        });
        // if (req.body.type == 1) {
        //     const mailOptions = {
        //         from: process.env.EMAIL_SENDER, // sender address
        //         to: req.body.userEmail,
        //         subject: 'Verify OTP',
        //         html: '<p>OTP for Insurex is ' + otp + '. It is valid for 30 minutes only. Do not share this with anyone.</p>'
        //     };
        //     commonFunctions.sendEmailNodemailer(mailOptions);

        // } else if (req.body.type == 2) {
            commonFunctions.twilioSendMessage({
                userPhone: req.body.userPhone,
                otp: otp
            });
        // } else {
        //     return responses.sendError(res, languageCode, {}, "", 'PARAMETER_MISSING');
        // }

        return responses.actionCompleteResponse(res, languageCode, {}, "OTP sent", constants.responseMessageCode.OTP_SENT);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

const logoutUser = async function (req, res) {
    const languageCode = req.query.language || 'en';

    try {
        const accessToken = req.headers.access_token;
        const user = req.user;
        const opts = {
            accessToken,
            user
        };
        await commonFunctions.validateUser(opts);
        const userTokens = user.accessTokens;
        let accessTokens;
        if (userTokens && userTokens.length > 0) {
            accessTokens = userTokens.filter((token) => {
                return token != accessToken;
            });
        }
        await User.findByIdAndUpdate(user._id, {
            $set: {
                accessTokens: accessTokens
            }
        });
        return responses.actionCompleteResponse(res, languageCode, {}, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (error) {
        logger.error(error);
        return responses.sendError(res, languageCode, {}, "", error);
    }
};

const forgotPassword = async function (req, res) {
    const languageCode = req.query.language || 'en';

    try {
        const user = await User.findOne({
            userEmail: req.body.userEmail,
            role: req.body.role || 1
        });
        if (user) {
            const otp = commonFunctions.generateOTP();
            otpData = new OTP({
                otp: otp,
                userEmail: user.userEmail,
                type: parseInt(req.body.type)
            });
            const dbOTP = await otpData.save();
            await OTP.deleteMany({
                userId: user._id,
                '_id': {
                    $ne: dbOTP._id
                },
                'type': parseInt(req.body.type)
            });
            const mailOptions = {
                from: process.env.EMAIL_SENDER, // sender address
                to: user.userEmail,
                subject: 'Forgot Password',
                html: '<p>OTP for reset passowrd in Insurex is ' + otp + '. It is valid for 30 minutes only. Do not share this with anyone.</p>'
            };
            commonFunctions.sendEmailNodemailer(mailOptions);
        } else {
            return responses.sendError(res, languageCode, {}, "This email is not registered with us.", constants.responseMessageCode.NO_DATA_FOUND);
        }
        return responses.actionCompleteResponse(res, languageCode, {}, "OTP sent", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (error) {
        logger.error(error);
        return responses.sendError(res, languageCode, {}, "", error);
    }
};


async function resetPassword(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        let otpData = await OTP.findOne({
            userEmail: req.body.userEmail,
            type: parseInt(req.body.type)
        });

        if (otpData && otpData.otp == req.body.otp) {
            const starts = moment(otpData.createdAt);
            const ends = moment();

            const duration = moment.duration(ends.diff(starts));

            if (duration._milliseconds / 60000 < 30) {
                responses.actionCompleteResponse(res, languageCode, {}, "Password reseted successfully.", constants.responseMessageCode.ACTION_COMPLETE);
                const userId = otpData.userId;
                await OTP.deleteMany({
                    userId,
                    type: parseInt(req.body.type)
                });
                const userPassword = Bcrypt.hashSync(req.body.userPassword, 10);
                await User.findByIdAndUpdate(userId, {
                    $set: {
                        userPassword
                    }
                });
                return;
            } else {
                return responses.sendError(res, languageCode, {}, 'OTP has been expired.', 'PARAMETER_MISSING');

            }
        } else {
            return responses.sendError(res, languageCode, {}, 'OTP doesn\'t match.', 'PARAMETER_MISSING');
        }

    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}


async function changePassword(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {
        let {
            userPasswordNew,
            userPasswordOld,
            languageCode
        } = req.body;
        const user = req.user;
        let currectPwd = Bcrypt.compareSync(userPasswordOld, user.userPassword)
        if (currectPwd) {
            const userPassword = Bcrypt.hashSync(userPasswordNew, 10);
            await User.findByIdAndUpdate(user._id, {
                $set: {
                    userPassword
                }
            });
            return responses.actionCompleteResponse(res, languageCode, {}, "", constants.responseMessageCode.PASSWORD_CHANGED_SUCCESSFULLY);
        } else {
            logger.log("INVALID CREDENTIALS");
            throw constants.responseMessageCode.OLD_PASSWORD_INCORRECT;
        }

    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}


async function verifyEmail(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {        
        let user = await User.findOne({
            email: req.body.email
        }).lean();
        if (!user) { 
            throw constants.responseMessageCode.ACCOUNT_NOT_REGISTER;
        }
        const accessToken = await commonFunctions.generateJWToken({userId: user._id});
        delete user.password;
        const data = {
            responseData: user,
            accessToken : accessToken
        };
        return responses.actionCompleteResponse(res, languageCode, data, "", constants.responseMessageCode.ACTION_COMPLETE);
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

module.exports = {
    registerUser,
    loginUser,
    verifyUser,
    resendOTP,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyEmail
}