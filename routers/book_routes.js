const express = require('express')
const bookController = require('../controllers/book_controller')
//const validation = require ("../middlewares/validation/validation")
//const validators = require ("../middlewares/validation/validators/listingValidators")
const router = express.Router()

//http://localhost:8000/api/v1/
router.get('/', bookController.listBooks)//returns []
//router.get('/books/:bookId', bookController.showListing)//return {}


module.exports = router
