var express = require('express');
var router = express.Router();
const users =require('../Modules/userModule');
const auth =require('../Modules/auth');

router.post('/registration',auth.password,users.registerUser);

router.post('/login',users.login());

router.put('/login/:id',auth.authToken,auth.valdidate,auth.password,users.updateUser());
router.delete('/login/:id',auth.authToken,auth.valdidate,users.deleteUser());

module.exports = router;

