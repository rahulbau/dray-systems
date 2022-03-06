const express = require('express');
const router = express.Router();
const multipartMiddleware = require('connect-multiparty')();
const commonUtilController = require("./controller/commonUtil");
const authMiddleware = require('../authentication/middlewares/authMiddleware');



router.post('/upload_media', multipartMiddleware, commonUtilController.uploadMedia);
router.post('/upload-csv-file', authMiddleware.auth, multipartMiddleware, commonUtilController.uploadBulkEmployees);



module.exports = router;
