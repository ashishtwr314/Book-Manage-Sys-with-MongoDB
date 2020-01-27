const Book = require("../model/Book");

const showSingleBook = (req, res, next) => {
  const id = req.params.id;
  Book.fetchById(req.params.id)
    .then(result => {
      res.render("details", {
        book: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = showSingleBook;
