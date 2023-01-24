import Express from "express";
import cors from "cors";
const app = Express();

import middleware from "./middleware/config.js"
middleware(app, Express, cors)

import db from "./connection/sqlite.js";

import productController from "./controllers/productController.js";
productController(app, db)

import userController from "./controllers/userController.js";
userController(app, db)

import cartController from "./controllers/cartController.js";
cartController(app, db)

export default app;