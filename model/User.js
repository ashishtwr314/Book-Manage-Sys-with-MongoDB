const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart) {
    this.username = username;
    this.email = email;
    this.cart = cart;
  }

  static findById = id => {
    return getDB()
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
  };

  addToCart = (id, book_id, bookName) => {
    let cart = this.cart;
    let toAdd = false;
    // console.log(cart);
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].book_id == book_id) {
          cart[i].quantity = cart[i].quantity + 1;
          toAdd = false;
          break;
        } else {
          toAdd = true;
        }
      }

      if (toAdd) {
        cart.push({
          book_id: book_id,
          quantity: 1,
          bookName: bookName
        });
      } else {
        console.log("Dont add");
      }
    } else {
      cart = [
        {
          book_id: book_id,
          quantity: 1,
          bookName: bookName
        }
      ];
    }

    return getDB()
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectID(id) },
        {
          $set: {
            cart: cart
          }
        }
      );
  };

  getCart = () => {
    let bookIds = this.cart.map(cartItems => {
      return new mongodb.ObjectID(cartItems.book_id);
    });

    return getDB()
      .collection("test")
      .find({ _id: { $in: bookIds } })
      .toArray()
      .then(result => {
        let cartBooks = result;
        cartBooks = cartBooks.map((book, i) => {
          return {
            name: book.name,
            price: book.price,
            author: book.author,
            quantity: this.cart[i].quantity,
            book_id: book._id
          };
        });

        return cartBooks;
      })
      .catch(err => {});
  };

  deleteFromCart = (user_id, book_id) => {
    let updatedCart = this.cart.filter((item, i) => {
      return item.book_id !== book_id;
    });

    return getDB()
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectID(user_id) },
        { $set: { cart: updatedCart } }
      );
  };
}

module.exports = User;
