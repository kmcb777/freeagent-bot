const express = require('express');
const demo = require('./routes/demo');

const router = express.Router();

router.use('/demo', demo);

module.exports = router;
