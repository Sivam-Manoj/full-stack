const express = require("express");
const router = express.Router();
const { register, login ,getMe} = require("../Controllers/UserController");
const { protect } = require("../Middlewares/authMiddleware");
router.post("/register",protect, register);
router.post("/login",login);
router.get("/me",protect,getMe)

module.exports = router;
