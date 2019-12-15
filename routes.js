const { Router } = require('express');
const authentication = require('./modules/authentication');
const common = require('./modules/common');
const user = require('./modules/user');

const router = Router();

router.use('/auth', authentication);
router.use('/util', common);
router.use('/user', user);

module.exports = router;
