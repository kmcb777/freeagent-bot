import express from 'express'

const router = express.Router()

router.get('/approve', async (req, res) => {
  console.log('GET --------------------->')
  console.log(req)
  console.log(JSON.stringify(req))

  return res.status(200)
})

router.post('/approve', async (req, res) => {
  console.log('POST --------------------->')
  console.log(req)
  console.log(JSON.stringify(req.body))

  return res.status(200)
})

export default router
