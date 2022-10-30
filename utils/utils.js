const mongoose = require("mongoose");

const connectToMongoDB = async (dbLink) => {
  console.log("Trying to connect to database...");
  mongoose
    .connect(dbLink)
    .then(() => {
      console.log("Connected to mongoDB successfully!");
    })
    .catch((e) => {
      console.error(
        "Sorry, something happend, could not secure connection to mongoDB"
      );
      console.log("CONNECTION_ERROR:", e.toString());
    });
};

module.exports = {
  connectToMongoDB,
};
