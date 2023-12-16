require('dotenv').config();
const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const logger = require("morgan");
const passport = require('passport');
const session = require('express-session');
const router = require('./routes/authRoutes');

//config db here

const app = express();



//test
app.set('view engine', 'ejs');
app.use(session({ secret: '52000109', resave: true, saveUninitialized: true }));



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

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    bodyParser.json({
        limit: "50mb"
    }),
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true
    })
);
app.use(helmet());
app.use(cors());


app.use(router)
app.use("/test", require("./routes/fakeRoutes"))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))