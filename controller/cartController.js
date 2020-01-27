const User = require("../model/User");

exports.addToCart = (req, res, next) => {
  const bookId = req.body._id;
  const bookName = req.body.name;
  const { _id, username, email, cart } = req.user;
  const user = new User(username, email, cart);

  user
    .addToCart(_id, bookId, bookName)
    .then(result => {
      res.redirect("/");
    })
    .catch(err => {
      console.log("Error");
    });
};

exports.getCart = (req, res, next) => {
  const { _id, username, email, cart } = req.user;
  const user = new User(username, email, cart);

  user
    .getCart()
    .then(result => {
      res.render("cart", {
        cartBooks: result
      });
    })
    .catch(err => {});
};

exports.deleteFromCart = (req, res, next) => {
  const { _id, username, email, cart } = req.user;
  const user = new User(username, email, cart);
  user
    .deleteFromCart(_id, req.params.id)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {});
};
