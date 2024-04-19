const express = require("express");
const {
  getAllUsers,
  getAnUser,
  registerUser,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:uid", isAuthenticated, getAnUser);
router.post("/", registerUser);

module.exports = router;
