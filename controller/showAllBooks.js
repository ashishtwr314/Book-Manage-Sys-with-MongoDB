const Book = require("../model/Book");

const showAllBooks = (req, res, next) => {
  Book.fetchAll()
    .then(result => {
      res.render("index", {
        books: result,
        adminMode: false
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = showAllBooks;
