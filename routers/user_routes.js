const express = require('express')
const userController = require('../controllers/user_controller')
const authMiddleware = require('../middlewares/auth_middleware')
const imageMethods = require("../middlewares/uploadImage/uploadImage")
const multer = require("multer")
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })
const upload = multer()

const router = express.Router()

//http://localhost:8000/api/v1/user
router.post('/register', userController.register)//returns 201
router.post('/login', userController.login)//returns 200, token in cookie
router.post('/logout', userController.logout)//returns []

router.get('/profile', userController.showProfile)//returns {}
router.get('/loans', userController.listLoans)//return []
router.get('/loans/:id', userController.showLoan)//return {}
router.get('/reserves', userController.listReserves) //return []
router.get('/favourites', userController.listfavourites)//return []

router.post('/book', userController.createBook)//returns 201
router.post('/loan/:book_id', userController.createLoan)//returns 201
router.post('/reserve/:book_id', userController.createReserve) //returns 201

router.patch('/loan/:id/renew', userController.renewBook)//returns 200
router.patch('/loan/:id', userController.closeBook)//return 200
router.patch('/book/:id', userController.editBook) //return 200
router.patch('/profile', userController.editProfile) //return 200

router.delete('/loan/:id', userController.editBook) //return 200
router.delete('/profile', userController.editProfile) //return 200





module.exports = router
