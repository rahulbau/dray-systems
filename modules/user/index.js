const express = require('express');
const router = express.Router();
const authMiddleware = require('../authentication/middlewares/authMiddleware');
const userValidator = require('./validators/userValidator');
const userController = require('./controllers/userController');

router.post('/feedback',userValidator.addUserFeedback, authMiddleware.auth, userController.addUserFeedback);
router.post('/supportRequest',userValidator.addSupportRequest, authMiddleware.auth, userController.addSupportRequest);
router.put('/user',userValidator.editUser, authMiddleware.auth, userController.editUser);
router.get('/user', authMiddleware.auth, userController.getUser);
router.get('/users', authMiddleware.auth, userController.getUsers);
module.exports = router;