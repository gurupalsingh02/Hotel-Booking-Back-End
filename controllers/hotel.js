const Hotel = require("../models/hotel");
exports.addHotel = async (req, res) => {
  try {
    console.log(req.user);
    req.body.owner = req.user._id;
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      newHotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel does not Exist",
      });
    }
    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not Authorized to Update this Hotel",
      });
    }
    const { name, city, address, desc, price } = req.body;
    if (name) {
      hotel.name = name;
    }
    if (city) {
      hotel.city = city;
    }
    if (address) {
      hotel.address = address;
    }
    if (desc) {
      hotel.desc = desc;
    }
    if (price) {
      hotel.price = price;
    }
    await hotel.save();
    res.status(200).json({
      success: true,
      message: "Hotel Updated Successfully",
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllHotel = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({
      success: true,
      hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel does not Exist",
      });
    }
    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not Authorized to Delete this Hotel",
      });
    }
    await hotel.deleteOne();
    res.status(200).json({
      success: true,
      message: "Hotel Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel does not Exist",
      });
    }
    res.status(200).json({
      success: true,
      message: "hotel Found",
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.countByCity = async (req, res) => {
  try {
    const cities = req.query.cities.split(",");

    console.log(cities);
    const count = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city }))
    );
    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.countByType = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({
      success: true,
      hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
