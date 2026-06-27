const Product = require("../models/Product");
const Category = require("../models/Category");


const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      condition,
      category,
      images
    } = req.body;

    const selectedCategory =
      await Category.findById(category);

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      condition,
      category,
      seller: req.user._id,

      images: images || [],

      carbonSaved:
        selectedCategory.carbonFootprint
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    // Search by title
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i"
      };
    }

    // Filter by category name
    if (category) {
      const selectedCategory =
        await Category.findOne({
          name: category
        });

      if (selectedCategory) {
        filter.category =
          selectedCategory._id;
      }
    }

    const products = await Product.find(filter)
      .populate(
        "seller",
        "name email department"
      )
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

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    )
      .populate(
        "seller",
        "name email phoneNumber department year"
      )
      .populate(
        "category",
        "name carbonFootprint"
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product.views += 1;

    await product.save();

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Ownership Check
    if (
      product.seller.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized to update this product"
      });
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    res.status(200).json({
      success: true,
      product: updatedProduct
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Ownership Check
    if (
      product.seller.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized to delete this product"
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const uploadToCloudinary =
  require("../utils/uploadToCloudinary");

const uploadProductImage = async (
  req,
  res
) => {
  try {
    if (
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded"
      });
    }

    const imageUrls = [];

    for (const file of req.files) {
      const result =
        await uploadToCloudinary(
          file.buffer
        );

      imageUrls.push(
        result.secure_url
      );
    }

    res.status(200).json({
      success: true,
      imageUrls
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
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage
};