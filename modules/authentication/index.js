const express = require('express');
const router = express.Router();

const authMiddleware = require('./middlewares/authMiddleware');
const authValidator = require('./validators/authValidator');
const authController = require('./controllers/authController');

router.post('/register', authValidator.userValidations.signUp, authController.registerUser);
router.post('/login', authValidator.userValidations.login, authController.loginUser);
router.post('/verify',authValidator.userValidations.verifyOTP,  authController.verifyUser);
router.post('/resend_otp',authValidator.userValidations.resendOTP, authController.resendOTP);
router.get('/logout', authMiddleware.auth, authController.logoutUser);
router.post('/forgot_password',authValidator.userValidations.forgotOTP, authController.forgotPassword);
router.post('/reset_password',authValidator.userValidations.resetPassword, authController.resetPassword);
router.post('/change_password',authValidator.userValidations.changePassword,authMiddleware.auth, authController.changePassword);
router.post('/check_email',authValidator.userValidations.verifyEmail, authController.verifyEmail);

module.exports = router;
