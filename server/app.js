require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require("morgan");

const app = express()

app.use("/test", require("./routes/fakeRoutes"))


app.use(logger("dev", {
    skip: function (req, res) {
        return req.url.includes("/vendors") ||
            req.url.includes("/images") ||
            req.url.includes("/javascripts") ||
            req.url.includes("/stylesheets") ||
            req.url.includes("/favicon.ico");
    }
}));



const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))