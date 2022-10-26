const express = require('express')
const authController = require('../controllers/auth_controller')
const authMiddleware = require('../middlewares/auth_middleware')

const router = express.Router()
// ,authController.login)
//http://localhost:8000/api/v1/auth
router.post('/register', authController.register)//returns 201
router.post('/login', authController.login)//returns 200, token in cookie
router.post('/logout', authMiddleware, authController.logout)//returns []

module.exports = router