const express = require('express')
const userController = require('../controllers/user_controller')
const authMiddleware = require('../middlewares/auth_middleware')
const imageMethods = require("../middlewares/image_methods")
const multer = require("multer")
const upload = multer()

const router = express.Router()

//http://localhost:8000/api/v1/user
router.post('/register', userController.register,userController.login)//returns 201
router.post('/login', userController.login)//returns 200, token in cookie
router.post('/logout', userController.logout)//returns []

router.get('/profile', authMiddleware, userController.showProfile)//returns {}
router.get('/loans', authMiddleware, userController.listLoans)//return []
// router.get('/loans/:id', userController.showLoan)//return {}
router.get('/reserves', userController.listReserves) //return []
router.get('/favourites', userController.listFavourites)//return []

// router.post('/book', userController.createBook)//returns 201
// router.post('/loan/:book_id', userController.createLoan)//returns 201
// router.post('/reserve/:book_id', userController.createReserve) //returns 201

// router.patch('/loan/:id/renew', userController.renewBook)//returns 200
// router.patch('/loan/:id', userController.closeBook)//return 200
// router.patch('/book/:id', userController.editBook) //return 200
router.patch('/profile', authMiddleware, upload.single("file"), imageMethods.uploadImge, userController.editProfile) //return 200

// router.delete('/loan/:id', userController.editBook) //return 200
// router.delete('/profile', userController.editProfile) //return 200





module.exports = router
