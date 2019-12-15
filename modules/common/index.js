const express = require('express');
const router = express.Router();
const multipartMiddleware = require('connect-multiparty')();
const commonUtilController = require("./controller/commonUtil");

router.post('/upload_media', multipartMiddleware, commonUtilController.uploadMedia);
router.post('/upload_icd', commonUtilController.addIcdMaster);
router.get('/icd_codes', commonUtilController.getIcdMaster);

module.exports = router;
