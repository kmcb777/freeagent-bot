import express from 'express'
import demo from './routes/demo'

const router = express.Router()

router.use('/demo', demo)

module.exports = router
