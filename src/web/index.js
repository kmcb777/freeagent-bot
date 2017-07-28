import express from 'express'
import home from './routes/home'
import demo from './routes/demo'

const router = express.Router()

router.use('/', home)
router.use('/demo', demo)

module.exports = router
