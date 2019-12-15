const fs = require('fs');
const db = require('../mongoLib');
const AWS = require('aws-sdk');
const JWT = require('jsonwebtoken');
const path = require('path');
const joi = require('@hapi/joi');
const sgClient = require('@sendgrid/client');
const gm = require('gm');
const { responseMessageCode } = require('./constants');
const logger = require('./logger');
const authService = require('../modules/authentication/services/authService');
const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);
const User = require('../modules/authentication/models/User');
const nodemailer = require('nodemailer');

gm.subClass({ imageMagick: true });

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'donotreply.insurex@gmail.com', 
        pass: 'rahul@123' 
    }
});

const generateJWToken = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const secret = fs.readFileSync(path.resolve('config/private.key'));
            const signOptions = {
                issuer: 'insurex',
                expiresIn: '30d'
            };

            payload.creationDateTime = Date.now();

            const token = JWT.sign(payload, secret, signOptions);
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};

const validateAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        const secret = fs.readFileSync(path.resolve('config/private.key'));

        const verifyOptions = {
            issuer: 'insurex',
            expiresIn: '30d'
        };

        JWT.verify(token, secret, verifyOptions, (err, decoded) => {
            if (err) {
                logger.error(err.toString());
                removeAccessToken({ accessToken: token }).catch((err1) => {
                    logger.log(err1);
                });
                reject(responseMessageCode.INVALID_ACCESS_TOKEN);
            }

            resolve(decoded);
        });
    });
};

const checkForAuthorizationHeader = (headers) => {
    const header = joi.object().keys({
        access_token: joi.string().trim().required()
    }).unknown(true);

    return joi.validate(headers, header);
};

const updateAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const oldAccessToken = payload.accessToken;
            const userTokens = payload.userAccessToken;
            let updatedTokens = [];

            if (userTokens && userTokens.length > 0) {
                if (oldAccessToken && userTokens.includes(oldAccessToken)) {
                    updatedTokens = userTokens.filter((token) => {
                        return token != oldAccessToken;
                    });
                } else {
                    updatedTokens = userTokens;
                }
            }

            logger.log('updatedTokens length is: ', updatedTokens.length);

            if (payload.accessTokens.length === 5) {
                throw responseMessageCode.MAX_LOGIN_DEVICES_REACHED;
            }

            generateJWToken({ user_id: payload.user_id })
                .then((token) => {
                    updatedTokens.push(token);

                    const opts = {
                        token: updatedTokens,
                        id: payload.user_id
                    };
                    authService.updateAccessToken(opts)
                        .then(() => {
                            resolve(token);
                        });
                }).catch((error) => {
                    logger.error(error);
                });
        } catch (error) {
            reject(error);
        }
    }
    );
};

const removeAccessToken = async (payload) => {
    try {
        let user = await User.findOne({accessTokens: payload.accessToken });
        const oldAccessToken = payload.accessToken;
        const userTokens = user.accessTokens;
        let updatedTokens = [];

        if (userTokens && userTokens.length > 0) {
            if (oldAccessToken && userTokens.includes(oldAccessToken)) {
                updatedTokens = userTokens.filter((token) => {
                    return token != oldAccessToken;
                });
            } else {
                updatedTokens = userTokens;
            }
        }
        await User.findByIdAndUpdate(user._id, {
            $set: {
                accessTokens: updatedTokens
            }
        });    
    } catch (error) {
        logger.error(error);
    }
};

const sendVerificationEmail = (payload) => {
    try {
        sgClient.setApiKey(process.env.sendgrid_api_key);
        const host = payload.host;
        const token = payload.token;
        const email = payload.toEmail;

        logger.log('Payload', payload);
        logger.log('api_key', process.env.sendgrid_api_key);

        sgClient.request({
            method: 'POST',
            url: '/v3/mail/send',
            body: {
                personalizations: [
                    {
                        to: [
                            {
                                email
                            }
                        ],
                        subject: 'Verify Your Email'
                    }
                ],
                from: {
                    email: 'sendgrid_email_id'
                },
                content: [
                    {
                        type: 'text/plain',
                        value: `Click on this link to verify your email ${host}/app_name/v1/auth/verifyEmail?token=${token}`
                    }
                ]
            }
        }).catch((error) => {
            logger.error(error);
        });
    } catch (e) {
        logger.error(e, 'sendVerificationEmail', e);
    }
};



const checkVerificationStatus = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const user = payload.user;

            if (
                !user.rewarded && user.email_verified
                && user.phone_verified && user.questions_verified
            ) {
                resolve(1);
            }

            resolve(0);
        } catch (error) {
            reject(error);
        }
    });
};

const validateUser = (opts) => {
    return new Promise((resolve, reject) => {
        const user = opts.user;

        if (!user) {
            reject(responseMessageCode.NO_DATA_FOUND);
        }

        if (
            user.accessTokens && user.accessTokens.length > 0
            && !user.accessTokens.includes(opts.accessToken)
        ) {
            reject(responseMessageCode.INVALID_ACCESS_TOKEN);
        } else if (!user.accessTokens) {
            reject(responseMessageCode.INVALID_ACCESS_TOKEN);
        }
        resolve(200);
    });
};


const getProductThumb = (apiReference, file, dimension) => {
    return new Promise(async (resolve, reject) => {
        try {
            const local_path = process.env.aws_temp_directory;

            let imageName = file.name.replace(/[`~!@#$%^&*()_|+\-=?;:'',<>\{\}\[\]\\\/]/gi, '');
            const timestamp = new Date().getTime().toString();
            let str = '';
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const size = chars.length;
            for (let i = 0; i < 4; i++) {
                const randomNumber = Math.floor(Math.random() * size);
                str = chars[randomNumber] + str;
            }
            imageName = imageName.replace(/\s/g, '');
            imageName = `${str}${timestamp}-${imageName}`;
            file.name = imageName;

            if (file.flag) {
                file.name = `${file.name}.${file.ext}`;
            }

            const filename = file.name; // actual filename of file

            const temp_path = path.resolve(local_path, filename);

            const folder = process.env.s3_upload_folder;
            const upload_thumb = await uploadThumbImageToS3Bucket(apiReference, file, folder, temp_path, dimension);

            fs.unlinkSync(temp_path);
            return resolve(upload_thumb);
        } catch (e) {
            logger.error(apiReference, { EVENT: 'ERROR In GetProductThumb', ERROR: e.toString(), STACK: e.stack });
            return reject(e.toString());
        }
    });
};

function uploadThumbImageToS3Bucket(apiReference, file, folder, temp_path, dimension) {
    return new Promise((resolve, reject) => {
        try {
            logger.log(apiReference, { EVENT: 'uploadThumbImageToS3Bucket' });

            let width = 250;
            let height = 250;
            if (dimension && dimension.width && dimension.height) {
                width = dimension.width;
                height = dimension.height;
            }

            gm(file.path)
                .resize(width, height)
                .autoOrient()
                .write(temp_path, (err) => {
                    if (!err) {
                        let filename = `thumb-${width}-${height}-${file.name}`;
                        const mimeType = file.type;
                        const accessKeyId = process.env.s3_access_key_id;
                        const secretAccessKeyId = process.env.s3_secret_access_key;
                        const bucketName = process.env.s3_bucket_name;

                        fs.readFile(temp_path, (error, file_buffer) => {
                            if (error) {
                                return reject(error.toString());
                            }
                            AWS.config.update({ accessKeyId, secretAccessKey: secretAccessKeyId });
                            const s3bucket = new AWS.S3();
                            const params = {
                                Bucket: bucketName,
                                Key: `${folder}/${filename}`,
                                Body: file_buffer,
                                ACL: 'public-read',
                                ContentType: mimeType
                            };

                            s3bucket.putObject(params, (s3err, data) => {
                                if (s3err) {
                                    logger.log(apiReference, {
                                        EVENT: 'ERROR s3bucket.putObject',
                                        ERROR: s3err.toString()
                                    });
                                    return reject(s3err.toString());
                                }
                                logger.log(
                                    apiReference,
                                    { EVENT: 'SUCCESSFULLY UPLOAD THE IMAGE TO AWS' }
                                );
                                filename = encodeURIComponent(filename);
                                return resolve(filename);
                            });
                        });
                    } else {
                        return reject(err.toString());
                    }
                });
        } catch (e) {
            logger.error(
                apiReference,
                { EVENT: 'ERROR uploadThumbImageToS3Bucket', ERROR: e.toString() }
            );
            return reject(e.toString());
        }
    });
}

const twilioSendMessage = (data) => {
    return new Promise((resolve, reject) => {
        client.messages.create({
                to: data.userPhone,
                from: '+17012034963',
                body: 'OTP for Just-Click is ' + data.otp + '. It is valid for 30 minutes only. Do not share this with anyone.',
            },
            (err, message) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    console.log(message);
                    resolve();
                }
            }
        ).catch((error) => {
            console.log(error);
            reject(error);

        });
    })
    
}

const sendEmail = (payload) => {
    try {
        sgClient.setApiKey(process.env.sendgrid_api_key);
        logger.log('Payload', payload);
        logger.log('api_key', process.env.sendgrid_api_key);
        const email = payload.email;
        sgClient.request({
            method: 'POST',
            url: '/v3/mail/send',
            body: {
                personalizations: [
                    {
                        to: [
                            {
                                email
                            }
                        ],
                        subject: payload.subject,
                    }
                ],
                from: {
                    email: 'donotreply.insurex@gmail.com'
                },
                content: [
                    {
                        type: 'text/plain',
                        value: payload.value
                    }
                ]
            }
        }).catch((error) => {
            logger.error(error);
        });
    } catch (e) {
        logger.error(e, 'sendVerificationEmail', e);
    }
};

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);

};

function sendEmailNodemailer(mailOptions) { 
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {

            console.log({
                success: 0,
                msg: 'email error',
                data: error.message
            });
        } else {
            console.log({
                success: 1,
                msg: 'mail send successfully',
                data: response
            });
        }
    });
}


function sendWelcomeEmail(payload) { 
    const mailOptions = {
        from: 'donotreply.insurex@gmail.com', // sender address
        to: payload.userEmail,
        subject: 'Welcome to insurex',
        html: `<html>
        <head>
        
            <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,700,700i" rel="stylesheet" />
            <title>Welcome</title>
            
            <style type="text/css" media="screen">
                /* Linked Styles */
                body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#001736; -webkit-text-size-adjust:none }
                a { color:#66c7ff; text-decoration:none }
                p { padding:0 !important; margin:0 !important } 
                img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
                .mcnPreviewText { display: none !important; }
        
                        
                /* Mobile styles */
                @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                    .mobile-shell { width: 100% !important; min-width: 100% !important; }
                    .bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
                    
                    .text-header,
                    .m-center { text-align: center !important; }
                    
                    .center { margin: 0 auto !important; }
                    .container { padding: 20px 10px !important }
                    
                    .td { width: 100% !important; min-width: 100% !important; }
        
                    .m-br-15 { height: 15px !important; }
                    .p30-15 { padding: 30px 15px !important; }
        
                    .m-td,
                    .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
        
                    .m-block { display: block !important; }
        
                    .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }
        
                    .column,
                    .column-top,
                    .column-empty,
                    .column-empty2,
                    .column-dir-top { float: left !important; width: 100% !important; display: block !important; }
        
                    .column-empty { padding-bottom: 10px !important; }
                    .column-empty2 { padding-bottom: 30px !important; }
        
                    .content-spacing { width: 15px !important; }
                }
            </style>
        </head>
        <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#fff; -webkit-text-size-adjust:none;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#fff" style = "background-color:#efefef;">
                <tr>
                    <td align="center" valign="top">
                        <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                            <tr>
                                <td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
                                    <!-- Header -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="p30-15" style="padding: 0px 30px 30px 30px;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                           
                                                        </th>
                                                        <th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Header -->
        
                                    <!-- Intro -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="padding-bottom: 10px;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td class="tbrr p30-15" style="padding: 60px 30px; border-radius:26px 26px 0px 0px; background-color:#fff; box-shadow: 0 20px 32px 0 rgba(0,36,107,.06) , 0 12px 16px 0 rgba(0,36,107,.06) , 0 4px 8px 0 rgba(0,36,107,.06) , 0 2px 4px 0 rgba(0,36,107,.06) , 0 0 2px 0 rgba(0,36,107,.06);" >
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="h1 pb25" style="color:#4facfe; font-family:'Open Sans', sans-serif; font-size:40px; line-height:46px; text-align:center; padding-bottom:25px;">Welcome to Insurex</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-center pb25" style="color:#4f5e66; font-family:'Open Sans', sans-serif; font-size:13px; line-height:30px; text-align:center; padding-bottom:25px;">We are very happy to onboard you on our healthcare platform. This is a one stop for all your insurance and healthcare related needs.Insurex connect you to multiple healthcare solution to make your like being secure and healthy.</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Intro -->
        
                                    <!-- Article / Full Width Image + Title + Copy + Button -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="padding-bottom: 10px;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#fff; box-shadow: 0 20px 32px 0 rgba(0,36,107,.06) , 0 12px 16px 0 rgba(0,36,107,.06) , 0 4px 8px 0 rgba(0,36,107,.06) , 0 2px 4px 0 rgba(0,36,107,.06) , 0 0 2px 0 rgba(0,36,107,.06);">
                                                    <tr>
                                                        <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://insurex.s3.us-east-2.amazonaws.com/images/image.jpg" width="650" height="366" border="0" alt="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="p30-15" style="padding: 50px 30px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="h3 pb20" style="color:#4facfe; font-family:'Open Sans', sans-serif; font-size:25px; line-height:32px; text-align:left; padding-bottom:20px;">Congratulations!! You have successfully signed up for the Insurex</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text pb20" style="color:#4f5e66; font-family:'Open Sans', sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;"><p>Here is your Email id and UID for login into Insurex dashboard. Use same password as you filled during signup. </p>
                                                                        <br>
                                                                        <b><p>Email: ${payload.userEmail}</p></b>
                                                                        <b><p>UID: ${payload.uid}</p></b>
                                                                    </td>
        
                                                                </tr>
                                                            
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Article / Full Width Image + Title + Copy + Button -->
        
        
        
                            
                                    <!-- Footer -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="p30-15 bbrr" style="padding: 50px 30px; border-radius:0px 0px 26px 26px; box-shadow: 0 20px 32px 0 rgba(0,36,107,.06) , 0 12px 16px 0 rgba(0,36,107,.06) , 0 4px 8px 0 rgba(0,36,107,.06) , 0 2px 4px 0 rgba(0,36,107,.06) , 0 0 2px 0 rgba(0,36,107,.06);" bgcolor="#fff">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                    
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer1 pb10" style="color:#c1cddc; font-family:'Open Sans', sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;">Team Insurex</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer2" style="color:#8297b3; font-family:'Open Sans', sans-serif; font-size:12px; line-height:26px; text-align:center;">Thankyou for Join us.</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
        
                                    </table>
                                    <!-- END Footer -->
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`
    };
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {

            console.log({
                success: 0,
                msg: 'email error',
                data: error.message
            });
        } else {
            console.log({
                success: 1,
                msg: 'mail send successfully',
                data: response
            });
        }
    });
}


function uploadToS3Bucket(file, folder) {
    return new Promise((resolve, reject) => {
        try {
            let imageName = file.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
            const timestamp = new Date().getTime().toString();
            let str = '';
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const size = chars.length;
            for (let i = 0; i < 4; i++) {
                const randomNumber = Math.floor(Math.random() * size);
                str = chars[randomNumber] + str;
            }
            imageName = imageName.replace(/\s/g, '');
            imageName = str + timestamp + "-" + imageName;
            file.name = imageName;
            if (file.flag) {
                file.name = file.name + "." + file.ext;
            }
            const fs = require('node-fs');
            const AWS = require('aws-sdk');

            let filename = file.name; // actual filename of file
            const path = file.path; //will be put into a temp directory'
            const mimeType = file.type;

            const accessKeyId = process.env.s3accessKeyId;
            const secretAccessKeyId = process.env.s3secretAccessKey;
            const bucketName = process.env.s3bucket;

            filename = file.name;
            AWS.config.update({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKeyId
            });
            const s3bucket = new AWS.S3();
            const params = {
                Bucket: bucketName,
                Key: folder + '/' + filename,
                Body: fs.createReadStream(path),
                ACL: 'public-read',
                ContentType: mimeType
            };
            s3bucket.upload(params, function (err, data) {
                if (err) {
                    logger.error(err, "err", err);
                    reject(0);
                } else {
                    resolve(filename);
                }
            });
        } catch (e) {
            logger.error(e);
            reject(0);
        }
    });

};

module.exports = {
    generateJWToken,
    validateAccessToken,
    checkForAuthorizationHeader,
    updateAccessToken,
    removeAccessToken,
    sendVerificationEmail,
    checkVerificationStatus,
    validateUser,
    getProductThumb,
    twilioSendMessage,
    sendEmail,
    generateOTP,
    sendEmailNodemailer,
    sendWelcomeEmail,
    uploadToS3Bucket
};
