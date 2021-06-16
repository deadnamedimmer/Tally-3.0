const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const socketIo = require("socket.io");

const db = require("./db");
const eventRouter = require("./routes/event-router");

// const flag = require('./updateFlag');

const app = express();
const apiPort = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", eventRouter);

const server = https.createServer({
	key: fs.readFileSync("/etc/letsencrypt/live/tally.cidlibrary.org/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/tally.cidlibrary.org/fullchain.pem"),
	ciphers: [
		"ECDHE-RSA-AES128-SHA256",
		"DHE-RSA-AES128-SHA256",
		"RC4",
		"HIGH",
		"!MD5",
		"!aNULL"
	].join(':'),
}, app);

const io = socketIo(server);



// let interval;

io.on("connection", (socket) => {

  socket.emit("Update")

  // if (interval) {
  //   clearInterval(interval);
  // }

  // getApiAndEmit(socket);
  // interval = setInterval(() => {

  //   if (flag.getUpdateFlag()) {
  //     getApiAndEmit(socket);
  //     flag.resetUpdateFlag();
  //   }

  // }, 1);


  socket.on("disconnect", () => {
    // clearInterval(interval);
  });
});

const getApiAndEmit = () => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  io.sockets.emit("Update", response);
};

let callbackHelper = require('./updateFlag');

callbackHelper.setCallback(getApiAndEmit);

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
