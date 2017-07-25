const express = require('express');
const home = require('./routes/home');
const demo = require('./routes/demo');
const path = require('path');

const router = express.Router();
const assetsPath = path.resolve(__dirname, '../build/assets');

router.use('/', home);
router.use('/demo', demo);

router.use('/assets', express.static(assetsPath));

module.exports = router;
