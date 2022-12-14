const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();


//import routing
const authRoutes = require("./router/auth"); 
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");

//configuring body parse
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//configure static files
app.use(express.static("uploads"));

//configure HEADER http  -cors
app.use(cors());

//configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);

module.exports = app;