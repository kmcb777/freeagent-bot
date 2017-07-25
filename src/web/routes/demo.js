const express = require('express');
const { demoHandler } = require('../handlers/demo');

const router = express.Router();

router.get('/', async (req, res) => {
  const value = 'test';
  let demo = await demoHandler(value);

  return res.render('demo.pug', { demo });
});

module.exports = router;
