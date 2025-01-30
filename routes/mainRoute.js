const express = require("express");
const authenticate = require("../middleware/mainMiddleware");
const mainController = require("../controllers/mainController");
const router = express.Router();

router.post("/register", mainController.createUser);
router.post("/login", mainController.loginUser);
router.get("/users",authenticate,mainController.getAllUsers);
module.exports = router;