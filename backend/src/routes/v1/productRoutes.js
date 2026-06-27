const express = require("express");

const router = express.Router();

const protect =
  require("../../middleware/authMiddleware");

const upload =
require("../../middleware/uploadMiddleware");


const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage
} = require("../../controllers/productController");

router.get("/", getProducts);
router.post("/upload",protect,upload.array("images", 5),uploadProductImage);
router.get("/:id", getProductById);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);




module.exports = router;