const bookModel = require("../models/book");

bookController = {
    listBooks: async(req, res) => {
        console.log("List all books")
        try {
            const books = await bookModel.findAll();
            res.json(books);
        } catch (error) {
            res.json({
                error: error.errors[0].message
            });
        }

    }
}

module.exports = bookController
