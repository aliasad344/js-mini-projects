const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let count = 0;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`User ${++count} connected`);
  socket.on("msg", (msg) => {
    //console.log("Message-->", msg);
    io.emit("msg", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User ${count--} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("Serever is listening on port 3000");
});
