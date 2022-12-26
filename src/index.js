import Express from "express";
import cors from "cors";
const app = Express();

import middleware from "./middleware/config.js"
middleware(app, Express, cors)

import db from "./connection/sqlite.js";

import userController from "./controllers/userController.js";
userController(app, db)

export default app;