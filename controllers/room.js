const Room = require("../models/room");
const Hotel = require("../models/hotel");
const room = require("../models/room");

exports.createRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel does not exist",
      });
    }
    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    const { title, price, maxPeople } = req.body;
    const room = new Room({
      title,
      price,
      maxPeople,
      hotel: hotel._id,
      owner: req.user._id,
    });
    await room.save();
    hotel.rooms.push(room._id);
    await hotel.save();
    console.log(room);
    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    console.log(room.owner.toString() + "  " + req.user._id.toString());
    if (room.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    if (req.body.title) room.title = req.body.title;
    if (req.body.price) room.price = req.body.price;
    if (req.body.maxPeople) room.maxPeople = req.body.maxPeople;
    if (req.body.desc) room.desc = req.body.desc;
    await room.save();
    res.status(200).json({
      success: true,
      message: "Room Updated successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRooom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room Fetched",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    if (!rooms) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All Room fetched",
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    if (room.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    await room.deleteOne();
    res.status(201).json({
      success: true,
      message: "Room Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
