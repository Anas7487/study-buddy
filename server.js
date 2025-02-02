const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);



app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected");

    // Join Room
    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
        io.to(room).emit("message", `User has joined room: ${room}`);
    });

    //create new room
    socket.on("newroom", (room) => {

        io.emit("newroom", newroom);

    });
    // Handle Messages
    socket.on("chatMessage", ({ room, message }) => {
        io.to(room).emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
