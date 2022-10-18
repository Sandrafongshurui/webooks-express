const bookModel = require("../models/book");

module.exports = {
    listBooks: async(req, res) => {
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
