const express = require("express");
const router = express.Router();
const showAllBooks = require("../controller/showAllBooks");

router.get("/", showAllBooks);

module.exports = router;
