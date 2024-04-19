const express = require("express");
const {
  getAllUsers,
  getAnUser,
  registerUser,
} = require("../controller/user.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:uid", getAnUser);
router.post("/", registerUser);

module.exports = router;
