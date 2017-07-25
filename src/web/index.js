const express = require('express');
const home = require('./routes/home');
const demo = require('./routes/demo');

const router = express.Router();

router.use('/', test);
router.use('/demo', demo);

module.exports = router;
