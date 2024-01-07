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
const adminRouter = require("./routes/adminRoutes")

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
        socket.join(userId);
        socket.emit("connected");
    });
    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((userId) => {
            if (userId == newMessageRecieved.sender._id) return;

            socket.in(userId).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userId);
    });
})