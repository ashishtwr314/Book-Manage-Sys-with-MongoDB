const Book = require("./../model/Book");

exports.getAdminLogin = (req, res, next) => {
  res.render("adminLogin");
};

exports.adminGetBooks = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  Book.fetchAll()
    .then(result => {
      res.render("index", {
        books: result,
        adminMode: true
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.adminEditBooks = (req, res, next) => {
  Book.fetchById(req.params._id)
    .then(result => {
      res.render("addbook", {
        book: result,
        editingMode: true
      });
    })
    .catch(err => {});
};
exports.updateBook = (req, res, next) => {
  const { name, author, genre, type, price, desc, _id } = req.body;
  const book = new Book(name, author, genre, type, price, desc, _id);
  book
    .saveBook()
    .then(result => {
      res.redirect("/admin");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteBook = (req, res, next) => {
  Book.deleteById(req.params.id)
    .then(result => {
      res.redirect("/admin");
    })
    .catch(err => {});
};
