const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
exports.databaseConnect = async () => {
  try {
    await mongoose
      .connect(MONGO_URI)
      .then((conn) => {
        console.log(`connected to MONGO DB ${conn.connection.host}`);
      })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    console.log(error);
  }
};