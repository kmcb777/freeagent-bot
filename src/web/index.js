import express from 'express'
import home from './routes/home'
import auth from './routes/auth'

const router = express.Router()

router.use('/', home)
router.use('/auth', auth)

module.exports = router
