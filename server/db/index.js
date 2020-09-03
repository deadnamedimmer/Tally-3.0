const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/tally", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const database = mongoose.connection;

module.exports = database;
