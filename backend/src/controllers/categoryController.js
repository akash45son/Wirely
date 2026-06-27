const Category = require("../models/Category");

// Create Category
const createCategory = async (req, res) => {
  try {
    const { name, carbonFootprint } = req.body;

    const category = await Category.create({
      name,
      carbonFootprint
    });

    res.status(201).json({
      success: true,
      category
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {
    const categories =
      await Category.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
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
  createCategory,
  getCategories
};