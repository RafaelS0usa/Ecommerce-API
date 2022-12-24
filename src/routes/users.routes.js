const Express = require("express");
const deletingUserController = require("../controllers/users/deletingUserController");
const gettingUserController = require("../controllers/users/gettingUserController");
const postingUserController = require("../controllers/users/postingUserController");
const updatingUserController = require("../controllers/users/updatingUserController");
const usersRoutes = Express.Router();

var db = [];

usersRoutes.post("/usuarios", postingUserController);

usersRoutes.get("/usuarios", gettingUserController);

usersRoutes.put("/usuarios/:id", updatingUserController);

usersRoutes.delete("/usuarios/:id", deletingUserController);

module.exports = usersRoutes, db;