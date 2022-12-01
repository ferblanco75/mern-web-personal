const express = require("express");
const {API_VERSION} = require("./constants");
const bodyParser = require("body-parser");

const app = express();
//import routing
//...


//configuring body parse
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//configure static files
app.use(express.static("uploads"));



//configure HEADER http  -cors
//..


//configure routings


module.exports = app;