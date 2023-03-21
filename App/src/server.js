const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

app.use(express.json());

//* create static files to index.html
app.use(express.static(path.join(__dirname, "../public")));

//* create server
const server = http.createServer(app);

//* declare socket io
const IO = new Server(server);

// variables to test socketIO server
let message = "Hello, world!";

//* listen connection event from client
IO.on("connection", (socket) => {
  console.log("connected");

  //* disconnect socket
  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  //* send message
  socket.emit("sendMessage", message);

  //* give message from client, update and response
  socket.on("increment", () => {
    message = "this's message";
    socket.emit("sendMessage", message);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
