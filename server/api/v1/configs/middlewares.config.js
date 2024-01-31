const path = require("path");
const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const logger = require("morgan");
const passport = require('passport');
const exphbs = require("express-handlebars")
const session = require('express-session');
const fn_helper = require("../helpers/functionalHelper");

const configure = (app) => {
    app.engine('hbs', exphbs.engine({
        defaultLayout: "layout",
        helpers: {
            truncateText: fn_helper
            // currentFormat: fn_helper.formatCurrency,
            // getStaffName: fn_helper.getStaffNameFromSalerData,
            // comparingString: fn_helper.equalStringWithString
        },
        partialsDir: __dirname + '../../../views/partials'
    }))
    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "../../../views"));
    app.use(session({ secret: '52000109', resave: true, saveUninitialized: true }));


    app.use(express.static(path.resolve(__dirname, '../../../public')));

    app.use(passport.initialize());
    app.use(passport.session());
    require('../helpers/passport');

    app.use(logger("dev", {
        skip: function (req, res) {
            return req.url.includes("/vendors") ||
                req.url.includes("/images") ||
                req.url.includes("/javascripts") ||
                req.url.includes("/stylesheets") ||
                req.url.includes("/favicon.ico");
        }
    }));

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
};

module.exports = configure;