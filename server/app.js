const express = require("express");
const {API_VERSION} = require("./constants");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


//import routing

const authRoutes = require("./router/auth"); 



//configuring body parse
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//configure static files
app.use(express.static("uploads"));



//configure HEADER http  -cors
app.use(cors);


//configure routings
app.use(`/api/${API_VERSION}`,authRoutes);
module.exports = app;