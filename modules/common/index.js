const express = require('express');
const router = express.Router();
const multipartMiddleware = require('connect-multiparty')();
const commonUtilController = require("./controller/commonUtil");
const authMiddleware = require('../authentication/middlewares/authMiddleware');
const validator = require('../authentication/validators/authValidator');

router.post('/upload_media', multipartMiddleware, commonUtilController.uploadMedia);
router.post('/categoryy', commonUtilController.addCategory);
router.get('/category',validator.userValidations.getCategory, commonUtilController.getCategory);
module.exports = router;
