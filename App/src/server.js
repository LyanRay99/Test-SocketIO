const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

app.use(express.json());

//* create static files to index.html
app.use(express.static(path.join(__dirname, "../public")));

//* create server
const server = http.createServer(app);

//* declare socket io
const IO = socketIO(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
