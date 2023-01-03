const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user");
const md_auth = require("../middleware/authenticated")

const api = express.Router();
const md_upload = multiparty( { uploadDir: "./uploads/avatar"});

api.get("/user/me",[md_auth.asureAuth], UserController.getMe);
api.get("/users",[md_auth.asureAuth], UserController.getUsers);
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);
api.patch("/user/:id", [md_auth.asureAuth, md_upload], UserController.updateUser);
api.delete("/user/:id", [md_auth.asureAuth], UserController.deleteUser);

module.exports = api;