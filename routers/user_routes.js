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
router.get('/loan/:loanId/book/:bookId/open', authMiddleware, userController.openBook)//return {}
router.get('/reserves', authMiddleware, userController.listReserves) //return []
router.get('/favourites', authMiddleware, userController.listFavourites)//return []
router.get('/notifications', authMiddleware, userController.listNotifications)//return []

router.post('/book', authMiddleware, userController.createBook)//returns 201
router.post('/loan/book/:bookId', authMiddleware, userController.createLoan)//returns 201
router.post('/reserve/book/:bookId', authMiddleware, userController.createReserve) //returns 201
router.post('/favourite/book/:bookId', authMiddleware, userController.createFavourite)

router.patch('/loan/:id/renew', authMiddleware, userController.renewLoan)//returns 200
router.patch('/loan/:loanId/book/:bookId/close', authMiddleware, userController.closeBook)//return 200
router.patch('/book/:id', authMiddleware, userController.editBook) //return 200
router.patch('/profile', authMiddleware, upload.single("file"), imageMethods.uploadImge, userController.editProfile) //return 200
router.patch('/notification/:id', authMiddleware, userController.readNotification) //return 200

router.delete('/loan/:loanId/book/:bookId/return', authMiddleware, userController.returnLoan, userController.checkReserveForBook, userController.createLoan) //return 200
router.delete('/profile', authMiddleware, userController.editProfile) //return 200
router.delete('/favourite/:id', authMiddleware, userController.deleteFavourite) //return 200
router.delete('/notification/:id', authMiddleware, userController.deleteNotification) //return 200
router.delete('/reserve/:id/cancel', authMiddleware, userController.cancelReserve) //return 200





module.exports = router
