const express = require('express')
const bookController = require('../controllers/book_controller')
//const validation = require ("../middlewares/validation/validation")
//const validators = require ("../middlewares/validation/validators/listingValidators")
const router = express.Router()

//http://localhost:8000/api/v1/books
router.get('/', bookController.listBooks)//returns []
router.get('/:id', bookController.showBook)//return {}
//router.get('/search', bookController.search)//return {}


module.exports = router
