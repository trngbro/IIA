require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))