const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connect = require("./util/database").connect;
const User = require("./model/User");
const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const homeRouters = require("./routes/homeRoute");
const detailsRouters = require("./routes/detailsRoute");
const addBookRouters = require("./routes/addBookRoute");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoute");

app.use((req, res, next) => {
  User.findById("5e2beee8136010236c4b58ec")
    .then(result => {
      req.user = result;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use(homeRouters);
app.use(detailsRouters);
app.use(addBookRouters);
app.use(adminRoutes);
app.use(cartRoutes);

connect(result => {
  app.listen(4000);
});
