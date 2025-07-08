const express = require("express");
const userController = require("../controllers/Users");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signIn);
router.post("/forgotpass", userController.forgotPass);

module.exports = router;
