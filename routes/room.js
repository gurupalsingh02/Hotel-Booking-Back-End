const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRooom,
  updateRoom,
  getAllRooms,
} = require("../controllers/room");
const { isAuthanticated } = require("../controllers/auth");
const router = express.Router();

router
  .route("/:id")
  .post(isAuthanticated, createRoom)
  .put(isAuthanticated, updateRoom)
  .delete(isAuthanticated, deleteRoom)
  .get(getRooom);
router.route("/").get(getAllRooms);

module.exports = router;
