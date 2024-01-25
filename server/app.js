require('dotenv').config();
const express = require('express');
const configure = require('./api/v1/configs/middlewares.config')

//config db here
const connectDB = require('./api/v1/configs/database.config');
connectDB()

//config middlewares
const app = express();
configure(app)

//client routing
const indexRouter = require('./routes/indexRoutes');

app.use("/login", indexRouter)


const chatRouter = require('./routes/chatRoutes')

app.use("/api/chat", chatRouter)


const messageRouter = require("./routes/messageRoutes")

app.use("/api/message", messageRouter)


//server routing
var isLogin = require("./api/v1/middlewares/authAccount");

const adminRouter = require("./routes/adminRoutes")

app.use("/admin/v2", isLogin)
app.use("/admin", adminRouter)


app.use("/test", require("./routes/fakeRoutes"))

//publishing
const server = app.listen(process.env.PORT || 8080, () => console.log(`Server started on port ${process.env.PORT || 8080}`))

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userId) => {
        if (userId && userId._id) {
            const userRoom = `user_${userId._id}`;
            socket.join(userRoom);
            console.log("User Joined User Room: " + userRoom);
        }
    });

    socket.on("join chat", (room) => {
        if (room && room._id) {
            const chatRoom = `chat_${room._id}`;
            socket.join(chatRoom);
            console.log("User Joined Chat Room: " + chatRoom);
        }
    });

    socket.on("typing", (room) => {
        if (room && room._id) {
            console.log("Typing in Room: " + room._id);
            socket.in(`chat_${room._id}`).emit("typing", true);
        }
    });

    socket.on("stop typing", (room) => {
        if (room && room._id) {
            console.log("Stopped Typing in Room: " + room._id);
            socket.in(`chat_${room._id}`).emit("stop typing", false);
        }
    });

    socket.on("new message", (newMessageReceived) => {
        const chat = newMessageReceived.chat;

        if (!chat || !chat.users) {
            console.log("Chat or chat.users not defined");
            return;
        }

        chat.users.forEach((user) => {
            if (user._id !== newMessageReceived.sender._id) {
                console.log("Sending message to user: ", user._id);
                socket.in(`user_${user._id}`).emit("message received", newMessageReceived);
            }
        });
    });

    socket.on("leave chat", (room) => {
        if (room && room._id) {
            console.log("User Leaving Chat Room: ", room._id);
            socket.leave(`chat_${room._id}`);
            socket.emit("disconnectEvent", room._id);
        }
    });
});