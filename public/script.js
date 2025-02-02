const socket = io();
let currentRoom = "";

const room = document.getElementById("room1");
const newroom = document.getElementById("newroom");
const addroomname = document.getElementById("addroomname");

function joinRoom() {
    if (room) {
        currentRoom = room;
        socket.emit("joinRoom", room.id);
        console.log(room)
    }
}

room.addEventListener("click", () => {joinRoom()});

function createRoom() {
    const newroom = newroom.id;
    if (newroom) {
        currentRoom = newroom;
        socket.emit("newroom", newroom);

            socket.on("newroom", (newroom) => {

        const room_box = document.getElementById("room-box");
        const box = room_box.createElement("button", { id: newroom, value: newroom  });

        box.appendChild(room_box);
    };
};

newroom.addEventListener("click", () => {createRoom()});    




function sendMessage() {
    const message = document.getElementById("message").value;
    if (message && currentRoom) {
        socket.emit("chatMessage", { room: currentRoom, message });
    }
};

socket.on("message", (msg) => {
    const chat = document.getElementById("chat");
    const div = document.createElement("div");
    div.textContent = msg;
    chat.appendChild(div);
});
