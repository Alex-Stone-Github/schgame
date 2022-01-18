const socket = io("ws://localhost:8000")

socket.on("message", (data) => {
    const el = document.createElement("li");
    el.innerHTML = data;
    document.getElementById("messages").appendChild(el);``
});


document.querySelector("button").onclick = () => {
    const text = document.querySelector("input").value;
    socket.emit("message", text);
}