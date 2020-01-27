const express = require("express");
const router = express.Router();
const showSingleBook = require("../controller/showSingleBook");

router.get("/details/:id", showSingleBook);

module.exports = router;
