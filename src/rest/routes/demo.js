const express = require('express');
const { demoHandler } = require('../handlers/demo');

const router = express.Router();

router.get('/', async (req, res) => {
  const value = 'test';

  return res.json(await demoHandler(value));
});

module.exports = router;
