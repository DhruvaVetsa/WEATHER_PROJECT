var express = require('express');
var router = express.Router();

const indexContoller = require('../controllers/index_contoller');


router.get('/', indexContoller.getHome);
router.post('/submit', indexContoller.postSearchClimate);

module.exports = router;