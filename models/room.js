const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is Required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  maxPeople: {
    type: Number,
    required: [true, "Room Capacity is Required"],
  },
  desc: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: "Hotel",
  },
  roomNumbers: {
    type: [
      {
        number: Number,
        unavailableDates: [
          {
            type: Date,
          },
        ],
      },
    ],
  },
});

roomSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

roomSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
roomSchema.methods.generateToken = async function () {
  return await jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
module.exports = mongoose.model("Room", roomSchema);
