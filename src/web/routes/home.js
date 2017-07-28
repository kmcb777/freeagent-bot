import express from 'express'

const router = express.Router()

router.get('/', (req, res) => res.render('home.pug'))
router.get('/test', (req, res) => res.render('home.pug'))

export default router
