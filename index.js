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
var players = [];
io.on("connection", (socket) => {
    // this literally just rebroadcasts an message it recieves
    console.log("A user has connected!");
    socket.on("message", (message) => {
        let data = JSON.parse(message);
        let np = {
            x:data.x,
            y:data.y,
            id:socket.id,
        }
        for (let i = 0; i < players.length; i ++) {
            if (players[i].id == np.id) {
                players[i] = np;
                return; // just end else append new
            }
        }
        players.push(np);
    })
});
setInterval(() => {
    io.emit("message", JSON.stringify(players));
}, 10)



// Routes
app.get("/", (req, res) => {
    res.end(readFile("./public/index.html"));
});
app.get("/src/main.js", (req, res) => {
    res.end(readFile("./public/src/main.js"));
});
app.get("/src/networking.js", (req, res) => {
    res.end(readFile("./public/src/networking.js"));
})
app.get("/css/main.css", (req, res) => {
    res.end(readFile("./public/css/main.css"));
})
app.get("/src/brick.js", (req, res) => {
    res.end(readFile("./public/src/brick.js"));
})
app.get("/src/entitiy.js", (req, res) => {
    res.end(readFile("./public/src/entity.js"));
})
app.get("/src/texture.js", (req, res) => {
    res.end(readFile("./public/src/texture.js"));
})
app.get("/src/vector.js", (req, res) => {
    res.end(readFile("./public/src/vector.js"));
})
app.get("/src/player.js", (req, res) => {
    res.end(readFile("./public/src/player.js"));
})

// Resources
app.get("/res/brick.jpg", (req, res) => {
    res.sendFile(__dirname + "/public/res/brick.jpg");
})

// Final Setup
const port = 8000;
http.listen(port, "localhost", () => {console.log(`Server started on port ${port}!`);});
