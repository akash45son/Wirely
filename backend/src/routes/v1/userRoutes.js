const express = require("express");
const protect = require("../../middleware/authMiddleware");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  getMyProducts,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  getDashboardStats
} = require("../../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/my-products", protect, getMyProducts);
router.post("/wishlist/:productId", protect, addToWishlist);
router.get("/wishlist", protect, getWishlist);
router.delete("/wishlist/:productId", protect, removeFromWishlist);
router.get("/dashboard", protect, getDashboardStats);

module.exports = router;