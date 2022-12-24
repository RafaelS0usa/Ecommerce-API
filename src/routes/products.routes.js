const Express = require("express")

const productsRoutes = Express.Router();

productsRoutes.post("/produtos");

productsRoutes.get("/produtos");

productsRoutes.put("/produtos/:id");

productsRoutes.delete("/produtos/:id");

module.exports = productsRoutes;