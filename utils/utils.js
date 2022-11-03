const mongoose = require("mongoose");
const path = require("path");
const findFile = (filePath) => {
  return path.join(__dirname, `/public/${filePath}`);
};
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

const emailIsValid = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = {
  connectToMongoDB,
  emailIsValid,
  findFile,
};
