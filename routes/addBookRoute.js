const addBookController = require("../controller/addBook");
const express = require("express");
const router = express.Router();

router.get("/addbook", (req, res, next) => {
  res.render("addbook", {
    editingMode: false
  });
});
router.post("/", addBookController);

module.exports = router;
