var express = require('express');
var router = express.Router();
const test =require('../Modules/userModule');

router.get('/', test.getdata);
router.post('/',test.writeUser);
router.put('/:id', test.updateData);
router.delete('/:id',test.delData);

router.get("/:id/books", test.getBooks);
router.post("/:id/books", test.addBooks)
router.put("/:id/books", test.updateBooks);
router.delete("/:id/books", test.delBooks);
module.exports = router;

