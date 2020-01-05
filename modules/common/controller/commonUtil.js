const responses = require("../../../util/responses");
const constants = require("../../../util/constants");
const multilingualService = require("../../../services/multilingualService");
const commonFunctions = require("../../../util/commonFunctions");
const logger = require("../../../util/logger");
const commonModel = require('../models/commonModel');
const fs = require('fs');

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

async function addCategory(req,res){
    const languageCode =req.query.languageCode || 'en';
    try{
        const icdCodes = fs.readFileSync(__dirname + '/category.json', 'utf-8');
        JSON.parse(icdCodes).map( async singleObj => {
            const data = new commonModel.category(singleObj);
            await data.save();
        });
        return responses.actionCompleteResponse(res, languageCode, {}, "", constants.responseMessageCode.ACTION_COMPLETE);
    }catch( e ){
        logger.error(e);
        return responses.sendError(res,languageCode,{},"",e)

    }
}


async function getCategory(req,res){
    const languageCode = req.query.languageCode || 'en';
    try{
        const tempArr = [];
        if (req.query.long && req.query.lat) {
            tempArr.push({
                  $geoNear: {
                     near: { type: "Point", coordinates: [ parseFloat(req.query.long) , parseFloat(req.query.lat) ] },
                     distanceField: "dist.calculated",
                     maxDistance: req.query.distance || 500,
                     includeLocs: "dist.location",
                     spherical: true
                  }
                });
        } else {
            tempArr.push({ $match : { type : parseInt(req.query.type),parentId : req.query.parentId || "" } });
        }
       let data = await commonModel.category.aggregate(tempArr);
        return responses.actionCompleteResponse(res, languageCode, data, "", constants.responseMessageCode.ACTION_COMPLETE);
    }catch( e ){
        logger.error(e);
        return responses.sendError(res,languageCode,{},"",e)

    }
}
  

module.exports = {
    uploadMedia,
    addCategory,
    getCategory
};
