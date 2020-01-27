const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");

class Book {
  constructor(name, author, genre, type, price, desc, _id) {
    this.name = name;
    this.author = author;
    this.price = price;
    this.genre = genre;
    this.type = type;
    this.desc = desc;
    this._id = _id;
  }

  saveBook = () => {
    if (this._id) {
      console.log("update karna Hai");
      return getDB()
        .collection("test")
        .updateOne(
          { _id: new mongodb.ObjectID(this._id) },
          {
            $set: {
              name: this.name,
              author: this.author,
              price: this.price,
              genre: this.genre,
              type: this.type,
              desc: this.desc
            }
          }
        );
    } else {
      return getDB()
        .collection("test")
        .insertOne(this);
    }
  };

  static fetchAll = () => {
    return getDB()
      .collection("test")
      .find()
      .toArray();
  };

  static fetchById = id => {
    return getDB()
      .collection("test")
      .find({ _id: new mongodb.ObjectID(id) })
      .next();
  };

  static deleteById = id => {
    return getDB()
      .collection("test")
      .deleteOne({ _id: new mongodb.ObjectID(id) });
  };
}

module.exports = Book;
