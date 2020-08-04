var express = require('express');
var router = express.Router();
const users =require('../Modules/userModule');

router.get('/', users.getUsers);
router.post('/',users.addUser);
router.put('/:id', users.updateUser);
router.patch('/:id', users.updateUserPatch);
router.delete('/:id',users.deleteUser);

module.exports = router;

