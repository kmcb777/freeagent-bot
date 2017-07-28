import express from 'express'
import { demoHandler } from '../handlers/demo'

const router = express.Router()

export default router.get('/', async (req, res) => {
  const value = 'test'
  const { value: demo } = await demoHandler(value)

  return res.render('demo.pug', { demo })
})
