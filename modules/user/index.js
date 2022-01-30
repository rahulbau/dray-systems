const express = require('express');
const router = express.Router();
const authMiddleware = require('../authentication/middlewares/authMiddleware');
const userValidator = require('./validators/userValidator');
const userController = require('./controllers/userController');

router.put('',userValidator.editUser, authMiddleware.auth, userController.editUser);
router.get('', authMiddleware.auth, userController.getUser);
router.get('/users', authMiddleware.auth, userController.getUsers);
router.get('/organizations',userValidator.getOrganizations, userController.getOrganizations);
router.post('/organizations',userValidator.addOrganizations,  userController.addOrganizations);
router.get('/competencies',userValidator.getCoreCompetencies, authMiddleware.auth, userController.getCoreCompetencies);
router.post('/competencies',userValidator.addCoreCompetencies, authMiddleware.auth, userController.addCoreCompetencies);


module.exports = router;