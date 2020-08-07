var express = require('express');
var router = express.Router();
const users =require('../Modules/userModule');
const auth =require('../Modules/auth');

router.post('/registration',auth.password,users.registerUser);
router.post('/login',auth.validate,users.login());
router.get('/login/:id',auth.session,users.showUser);
router.put('/login/:id',auth.session,users.updateUser());
router.delete('/login/:id',auth.session,users.deleteUser());

module.exports = router;

