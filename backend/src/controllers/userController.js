const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const Product = require("../models/Product");

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      department,
      year
    } = req.body;

    const user = await User.create({
      name,
      email,
      phoneNumber,
      password,
      department,
      year
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message
  });

  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch =
      await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

   res.status(200).json({
  success: true,
  message: "Login successful",
  token: generateToken(user._id),
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getUserProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user._id
    })
      .populate(
        "category",
        "name carbonFootprint"
      );

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(
      productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const user = await User.findById(
      req.user._id
    );

    const alreadyExists =
      user.wishlist.includes(productId);

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message:
          "Product already in wishlist"
      });
    }

    user.wishlist.push(productId);

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Product added to wishlist"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).populate({
      path: "wishlist",
      populate: {
        path: "category",
        select: "name carbonFootprint"
      }
    });

    res.status(200).json({
      success: true,
      count: user.wishlist.length,
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(
      req.user._id
    );

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Product removed from wishlist"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      seller: req.user._id
    }).populate("category");

    const totalCarbonSaved =
      products.reduce(
        (total, product) =>
          total + product.carbonSaved,
        0
      );

    const productsListed =
      products.length;

    const sustainabilityScore =
      Math.round(
        totalCarbonSaved * 10
      );

    const eWastePrevented =
      productsListed;

    // New Metrics

    const carTravelAvoidedKm =
      Number(
        (totalCarbonSaved * 5).toFixed(2)
      );

    const treesEquivalent =
      Number(
        (totalCarbonSaved / 10).toFixed(2)
      );

    // Find Top Category

    const categoryCount = {};

    products.forEach((product) => {
      const categoryName =
        product.category?.name;

      if (!categoryName) return;

      categoryCount[categoryName] =
        (categoryCount[categoryName] || 0) + 1;
    });

    let topSustainableCategory =
      "No Products";

    let maxCount = 0;

    for (const category in categoryCount) {
      if (
        categoryCount[category] >
        maxCount
      ) {
        maxCount =
          categoryCount[category];

        topSustainableCategory =
          category;
      }
    }

    res.status(200).json({
      success: true,

      totalCarbonSaved,

      productsListed,

      sustainabilityScore,

      eWastePrevented,

      carTravelAvoidedKm,

      treesEquivalent,

      topSustainableCategory
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getDashboardStats,
  getMyProducts,
  addToWishlist,
  getWishlist,
  removeFromWishlist
};