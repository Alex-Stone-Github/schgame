// Library Setup
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http").Server(app); // http server for socket.io
const io = require("socket.io")(http, {
    // specify cors
    cors: {
        origin: "*",
    }
});
// specify express uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Custom Functions
function readFile(path) {
    return fs.readFileSync(path);
};



// Socket Events
io.on("connection", (socket) => {
    console.log("A user has connected!");
    socket.on("message", (message) => {
        console.log(message);
        io.emit("message", `${socket.id} said ${message}`);
    })
});



// Routes
app.get("/", (req, res) => {
    res.end(readFile("./public/index.html"));
});
app.get("/src/main.js", (req, res) => {
    res.end(readFile("./public/src/main.js"));
});

// Final Setup
const port = 8000;
http.listen(port, "localhost", () => {console.log(`Server started on port ${port}!`);});
