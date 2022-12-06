const express = requiere("express");
const AuthController = require("../controllers/auth");

const api = express.Router();

api.post("/auth/register", AuthController.register);


module.exports = {
    api,
};