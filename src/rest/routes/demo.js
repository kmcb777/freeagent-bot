const express = require('express')
const { demoHandler, basicDemoHandler } = require('../handlers/demo')

const router = express.Router()

export default router.get('/', async (req, res) => {
  const value = 'test'

  return res.json(await demoHandler(value))
})

router.get('/basic', async (req, res) => {
  const value = 'test'

  return res.json(await basicDemoHandler(value))
})
