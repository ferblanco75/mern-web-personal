const express = require("express");
const multipart = require("connect-multiparty");
const UserController = require("../controllers/user");
const md_auth = require("../middleware/authenticated")

const api = express.Router();
const md_upload = multipart( { uploadDir: "./uploads/avatar"});


api.get("/user/me",[md_auth.asureAuth], UserController.getMe);
api.get("/users",[md_auth.asureAuth], UserController.getUsers);
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);

module.exports = api;