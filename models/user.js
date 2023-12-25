const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    maxlength: [50, "name cannot be more than 50 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [6, "password should be at least of 6 characters"],
  },
  image: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  desc: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = async function () {
  return await jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
module.exports = mongoose.model("User", userSchema);
