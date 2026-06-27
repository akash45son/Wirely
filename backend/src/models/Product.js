const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    images: [
      {
        type: String
      }
    ],

    condition: {
      type: String,
      enum: [
        "New",
        "Like New",
        "Good",
        "Fair"
      ],
      default: "Good"
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    carbonSaved: {
      type: Number,
      default: 0
    },

    views: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Sold",
        "Reserved"
      ],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

module.exports = Product;