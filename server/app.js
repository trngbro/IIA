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


//server routing
const adminRouter = require("./routes/adminRoutes")

app.use("/admin", adminRouter)


app.use("/test", require("./routes/fakeRoutes"))

//publishing
app.listen(process.env.PORT || 8080, () => console.log(`Server started on port ${process.env.PORT || 8080}`))