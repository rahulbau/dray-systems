const express = require('express');
const router = express.Router();
const authMiddleware = require('../authentication/middlewares/authMiddleware');
const userValidator = require('./validators/userValidator');
const userController = require('./controllers/userController');

router.post('/member_stat',userValidator.addMemberStat, authMiddleware.auth, userController.addMemberStat);
router.post('/lab_test',userValidator.addLabTest, authMiddleware.auth, userController.addLabTest);
router.post('/add_eth',userValidator.addEth, authMiddleware.auth, userController.addEth);
router.get('/user_ehr', authMiddleware.auth, userController.getEHR);
router.put('/user',userValidator.editUser, authMiddleware.auth, userController.editUser);
router.get('/user', authMiddleware.auth, userController.getUser);
router.post('/menstrual_history',userValidator.addMenstrualHistory,authMiddleware.auth,userController.addMenstrualHistory);
router.post('/past_history',userValidator.pastHistory,authMiddleware.auth,userController.addPastHistory);
router.post('/insurance_policy',userValidator.addInsurancePolicy,authMiddleware.auth,userController.addInsurancePolicy);
router.post('/family_history',userValidator.addFamilyHistory,authMiddleware.auth,userController.addFamilyHistory);
router.get('/users', authMiddleware.auth, userController.getUsers);
router.post('/personal_history',userValidator.personalHistory,authMiddleware.auth,userController.addPersonalHistory);
router.put('/insurance_policy',userValidator.editInsurancePolicy,authMiddleware.auth,userController.editInsurancePolicy);
router.put('/lab_test',userValidator.editLabTest, authMiddleware.auth, userController.editLabTest);
router.put('/add_eth',userValidator.editEhr, authMiddleware.auth, userController.editEhr);

router.get('/insurance_policy',authMiddleware.auth,userController.getUserPolicy);
module.exports = router;