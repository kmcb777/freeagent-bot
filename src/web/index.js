const express = require('express');
const home = require('./routes/home');
const demo = require('./routes/demo');

const router = express.Router();

router.use('/', home);
router.use('/demo', demo);

module.exports = router;
