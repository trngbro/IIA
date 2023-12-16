require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require("morgan");
const passport = require('passport');
const session = require('express-session');
const router = require('./routes/authRoutes')

const app = express();

app.set('view engine', 'ejs');
app.use(session({ secret: '52000109', resave: true, saveUninitialized: true }));
app.use("/test", require("./routes/fakeRoutes"))
app.use(passport.initialize());
app.use(passport.session());
require('./api/v1/helpers/passport');

app.use(logger("dev", {
    skip: function (req, res) {
        return req.url.includes("/vendors") ||
            req.url.includes("/images") ||
            req.url.includes("/javascripts") ||
            req.url.includes("/stylesheets") ||
            req.url.includes("/favicon.ico");
    }
}));

app.use(router)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))