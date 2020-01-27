const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController.js");

router.post("/addTocart", cartController.addToCart);
router.get("/cart", cartController.getCart);
router.get("/deleteFromCart/:id", cartController.deleteFromCart);

module.exports = router;
