const mongoose = require("mongoose");

mongoose
  .connect("mongodb://172.16.0.129:27017/tally", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const database = mongoose.connection;

module.exports = database;
