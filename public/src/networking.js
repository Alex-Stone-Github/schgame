const socket = io("ws://localhost:8000")

socket.on("message", (data) => {
    recieve(JSON.parse(data));
});

function recieve(data) {
    otherEntities = data;
}

function send(data) {
    socket.emit("message", JSON.stringify(data));
}