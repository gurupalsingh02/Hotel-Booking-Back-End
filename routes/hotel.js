const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");
const {
  addHotel,
  updateHotel,
  getAllHotel,
  deleteHotel,
  getHotel,
  countByCity,
  countByType,
} = require("../controllers/hotel");
const { isAuthanticated } = require("../controllers/auth");

router.route("/countByCity").get(countByCity);
router.route("/countByType").get(countByType);
router.route("/").post(isAuthanticated, addHotel).get(getAllHotel);
router
  .route("/:id")
  .put(isAuthanticated, updateHotel)
  .delete(isAuthanticated, deleteHotel)
  .get(getHotel);

module.exports = router;
