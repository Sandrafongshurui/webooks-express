const express = require('express')
const userController = require('../controllers/user_controller')
const authMiddleware = require('../middlewares/auth_middleware')
const imageMethods = require("../middlewares/image_methods")
const multer = require("multer")
const upload = multer()

const router = express.Router()

//http://localhost:8000/api/v1/
router.get('/profile', authMiddleware, userController.showProfile)//returns {}
router.get('/loans', authMiddleware, userController.listLoans)//return []
router.get('/loans/:id', authMiddleware, userController.openBook)//return {}
router.get('/reserves', authMiddleware, userController.listReserves) //return []
router.get('/favourites', authMiddleware, userController.listFavourites)//return []

router.post('/book', authMiddleware, userController.createBook)//returns 201
router.post('/loan/:book_id', authMiddleware, userController.createLoan)//returns 201
router.post('/reserve/:book_id', authMiddleware, userController.createReserve) //returns 201
router.post('/favourite/:book_id', authMiddleware, userController.createFavourite)

router.patch('/loan/:id/renew', authMiddleware, userController.renewLoan)//returns 200
router.patch('/loan/:id', authMiddleware, userController.closeBook)//return 200
router.patch('/book/:id', authMiddleware, userController.editBook) //return 200
router.patch('/profile', authMiddleware, upload.single("file"), imageMethods.uploadImge, userController.editProfile) //return 200

router.delete('/loan/:id', authMiddleware, userController.returnLoan, userController.checkReserveForBook, userController.createLoan) //return 200
router.delete('/profile', authMiddleware, userController.editProfile) //return 200
router.delete('/favourite/:id', authMiddleware, userController.deleteFavourite) //return 200





module.exports = router
