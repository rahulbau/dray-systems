const responses = require("../../../util/responses");
const constants = require("../../../util/constants");
const multilingualService = require("../../../services/multilingualService");
const commonFunctions = require("../../../util/commonFunctions");
const logger = require("../../../util/logger");
const commonModel = require('../models/commonModel');
const fs = require('fs');
const csv = require('fast-csv');
const User = require('../../authentication/models/User');
const UserCoreModel = require('../../user/models/userCore');


function uploadMedia(req, res) {
    logger.request("API", req.protocol + '://' + req.get('host') + req.originalUrl);
    logger.request(req.files);

    let mediaType = req.body.media_type || 0;
    mediaType = parseInt(mediaType);

    const languageCode = req.query.languageCode || 'en';
    let folderPath = 'images';

    let checkMediaType = false;
    let maxAllowedSize = constants.MAX_IMAGE_SIZE_ALLOWED;

    switch (mediaType) {
        case constants.mediaType.IMAGE:
            checkMediaType = constants.ALLOWED_IMAGE_MIME_TYPE.indexOf(req.files.ref_file.type) > -1;
            maxAllowedSize = constants.MAX_IMAGE_SIZE_ALLOWED;
            folderPath = 'images';
            break;

        case constants.mediaType.AUDIO:
            checkMediaType = true;
            maxAllowedSize = constants.MAX_IMAGE_SIZE_ALLOWED;
            folderPath = 'audio';
            break;

        case constants.mediaType.VIDEO:
            checkMediaType = constants.ALLOWED_VIDEO_MIME_TYPE.indexOf(req.files.ref_file.type) > -1;
            maxAllowedSize = constants.MAX_VIDEO_SIZE_ALLOWED;
            folderPath = 'video';
            break;

        case constants.mediaType.DOCUMENT:
            checkMediaType = true;
            maxAllowedSize = constants.MAX_IMAGE_SIZE_ALLOWED;
            folderPath = 'doc';
            break;

        default:
            checkMediaType = constants.ALLOWED_IMAGE_MIME_TYPE.indexOf(req.files.ref_file.type) > -1;
            maxAllowedSize = constants.MAX_IMAGE_SIZE_ALLOWED;
            folderPath = 'images';
            break;
    }

    if (!checkMediaType) {
        return responses.sendCustomResponse(res, multilingualService.getResponseMessage(constants.responseMessageCode.NOT_A_VALID_IMAGE_LIST,
            languageCode), constants.responseMessageFlags.CLIENT_ERROR, {}, {});
    }

    if (req.files.ref_file.size < maxAllowedSize) {
        commonFunctions.uploadToS3Bucket(req.files.ref_file, folderPath).then((refImage) => {
            const ref_file = process.env.s3URL+ '/' + folderPath + '/' + refImage;
            const data = {
                ref_link: ref_file,
                media_type: mediaType
            };
            return responses.actionCompleteResponse(res, languageCode, data, "", constants.responseMessageCode.ACTION_COMPLETE);
        }).catch((error) => {
            console.log(error);
            return responses.sendCustomResponse(res, 'Error in uploading. Try again later.',500);
        });
    } else {
        return res.send(JSON.stringify({
            message: multilingualService.getResponseMessage(constants.responseMessageCode.SIZE_EXCEEDS,
                language || 'en'), status: constants.responseFlags.SHOW_ERROR_MESSAGE,
            data: {}
        }));
    }
}

async function uploadBulkEmployees(req, res) {
    const languageCode = req.query.languageCode || 'en';
    try {

        if (!req.files.file || req.files.file.type !== 'text/csv') {
            return responses.sendCustomResponse(res, multilingualService.getResponseMessage(constants.responseMessageCode.NOT_A_VALID_IMAGE_LIST,
                languageCode), constants.responseMessageFlags.CLIENT_ERROR, {}, {}); 
        }
        console.log(req.files);

        if (req.files.file.size < constants.MAX_IMAGE_SIZE_ALLOWED) {
            // Import CSV File to MongoDB database
            let csvData = [];
            let filePath = req.files.file.path;
            fs.createReadStream(filePath)
                .pipe(csv.parse({ headers: true }))
                .on("error", (error) => {
                    throw constants.responseMessageCode.UPLOAD_ERROR;
                })
                .on("data", (row) => {
                    csvData.push(row);
                })
                .on("end", async () => {
                 let responseData = await addBulkEmployees(csvData, req.user._id.toString());
                 return responses.actionCompleteResponse(res, languageCode, responseData, "", constants.responseMessageCode.ACTION_COMPLETE);
                });
        } else {
            return res.send(JSON.stringify({
                message: multilingualService.getResponseMessage(constants.responseMessageCode.SIZE_EXCEEDS,
                    language || 'en'), status: constants.responseFlags.SHOW_ERROR_MESSAGE,
                data: {}
            }));
        }
    } catch (e) {
        logger.error(e);
        return responses.sendError(res, languageCode, {}, "", e);
    }
}

async function addBulkEmployees(employeeArr, id) {
    const failureData = [];
    const successData = [];
    const userInfoArr = ["address", "cellPhoneNumber", "citizenship", "city", "companyPhone", "companyEmail", "dob", "designation", "employeeId", "extension", "firstName", "gender", "homePhoneNumber", "indigenous", "lastName", "personalEmail", "zipcode", "primaryLang", "referredBy", "SIN", "state"];
    for (const elem of employeeArr) {
        if (elem.email) {
            let user = await User.findOne({
                email: elem.email
            }).lean();

            if (!user) {
                user = await UserCoreModel.organization.findOne({
                    email: elem.email
                }).lean();
            }
            if (user) {
                elem.message = "Email already exist in system";
                failureData.push(elem);
            } else {
                let employeeObj = {
                    email: elem.email,
                    userInfo: {
                        organizationId: id
                    }
                };
                userInfoArr.forEach(key => {
                    if (elem[key]) {
                        employeeObj["userInfo"][key] = elem[key];
                    }
                });
                let userData = new User(employeeObj);
                userData = await userData.save();
                successData.push(userData);
            }
            
        } else {
            elem.message = "Email not present in CSV file";
            failureData.push(elem);
        }
    };
    return {
        successData,
        failureData
    }
}

  

module.exports = {
    uploadMedia,
    uploadBulkEmployees
};
