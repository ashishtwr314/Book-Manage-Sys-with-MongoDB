const Book = require("../model/Book");

const addBook = (req, res, next) => {
  const { name, author, genre, type, price, desc } = req.body;
  const book = new Book(name, author, genre, type, price, desc);
  book
    .saveBook()
    .then(result => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = addBook;
