const express = require("express");
//importo el controlador de auth
const AuthController = require("../controllers/auth");

const api = express.Router();

//defino mi primera ruta- como voy a enviar datos del cliente al servidor uso un post
//cuando hago un post se ejecuta la funcion register de authcontroller
api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);


module.exports = api;