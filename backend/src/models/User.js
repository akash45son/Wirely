const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// PUT THIS HERE

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phoneNumber: { 
      type: String,
       required: true, 
       trim: true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"]
       },
    password: {
      type: String,
      required: true
    },

    department: {
      type: String,
      default: ""
    },

    year: {
      type: Number,
      default: 1
    },

    avatar: {
      type: String,
      default: ""
    },

    sustainabilityScore: {
      type: Number,
      default: 0
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
  },
  {
    timestamps: true
  }
);



userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

userSchema.methods.matchPassword =
  async function (enteredPassword) {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

const User = mongoose.model(
  "User",
  userSchema
);



module.exports = User;