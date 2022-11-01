const db = require("../models");

const bookController = {
  listBooks: async (req, res) => {
    try {
      console.log("List all books");
      const latestBooks = await db.book.findAll({
        order: [["createdAt", "DESC"]],
      });
      const popularBooks = await db.book.findAll({
        order: [["totalLoans", "DESC"]],
      });
      return res.status(200).json({latestBooks, popularBooks})
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
  showBook: async (req, res) => {
    try {
      const book = await db.book.findByPk(req.params.id);
      if (book) {
        return res.json(book);
      } else {
        return res.status(404).json({
          error: "Book not found.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
  search: async (req, res) => {
    try {
    } catch (error) {}
  },
};

module.exports = bookController;
