const router = require('express').Router()
const {dashboardGetController} = require('../controllers/dashboardController')
const { isAuthenticated } = require('../middleware/authMiddleware')

router.get('/', isAuthenticated, dashboardGetController)

router.get('/create-profile')
router.post('/create-profile')

module.exports = router