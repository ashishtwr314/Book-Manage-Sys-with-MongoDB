const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.get("/login", adminController.getAdminLogin);

router.get("/admin", adminController.adminGetBooks);

router.get("/edit/:_id", adminController.adminEditBooks);

router.post("/admin", adminController.updateBook);

router.get("/delete/:id", adminController.deleteBook);

module.exports = router;
