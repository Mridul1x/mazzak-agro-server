const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAProduct,
  createProduct,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.post("/", createProduct);

module.exports = router;
