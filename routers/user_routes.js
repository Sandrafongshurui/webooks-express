const express = require('express')
const bookController = require('../controllers/book_controller')
//const validation = require ("../middlewares/validation/validation")
//const validators = require ("../middlewares/validation/validators/listingValidators")
const router = express.Router()

//http://localhost:8000/api/v1/users
router.get('/', userController.listBooks)//returns []
router.get('/:id', userController.showBook)//return {}


module.exports = router
