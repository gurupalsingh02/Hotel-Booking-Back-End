const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hotel name is required"],
    trim: true,
    maxlength: [50, "Hotel name cannot be more than 50 characters"],
  },
  type: {
    type: String,
    required: [true, "Hotel type is required"],
    trim: true,
    maxlength: [50, "Hotel type cannot be more than 50 characters"],
  },
  city: {
    type: String,
    required: [true, "Hotel city is required"],
    trim: true,
    maxlength: [50, "Hotel city cannot be more than 50 characters"],
  },
  address: {
    type: String,
    required: [true, "Hotel address is required"],
    trim: true,
    maxlength: [50, "Hotel address cannot be more than 50 characters"],
  },
  distance: {
    type: String,
    required: [true, "Hotel description is required"],
    trim: true,
    maxlength: [500, "Hotel description cannot be more than 500 characters"],
  },
  photos: {
    type: [String],
    required: [true, "Hotel photos are required"],
  },
  desc: {
    type: String,
    required: [true, "Hotel description is required"],
    trim: true,
    maxlength: [500, "Hotel description cannot be more than 500 characters"],
  },
  rating: {
    type: Number,
    required: [true, "Hotel rating is required"],
    min: [1, "Hotel rating cannot be less than 1"],
    max: [5, "Hotel rating cannot be more than 5"],
  },
  rooms: {
    type: [mongoose.Schema.ObjectId],
    ref: "Room",
  },
  cheapestPrice: {
    type: Number,
    required: [true, "Hotel cheapest price is required"],
    min: [1, "Hotel cheapest price cannot be less than 1"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
