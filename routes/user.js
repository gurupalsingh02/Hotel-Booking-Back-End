const express = require("express");
const { updateUser, updatePassword } = require("../controllers/user");
const router = express.Router();
const { isAuthanticated } = require("../controllers/auth");

router.route("/update/profile").post(isAuthanticated, updateUser);
router.route("/update/passeword").post(isAuthanticated, updatePassword);

module.exports = router;
