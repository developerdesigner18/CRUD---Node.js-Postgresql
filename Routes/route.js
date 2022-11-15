const Controller = require("../Controller/controller");
var router = require("express").Router();

module.exports = (app) => {
  // Retrieve all Products
  router.get("/product", Controller.findAllProducts);

  // Create a new Order
  router.post("/order", Controller.create);

  // Retrieve all Orders
  router.get("/order", Controller.findAllOrders);

  // Update a Order with id
  router.put("/order/:id", Controller.update);

  // Delete a Order with id
  router.delete("/order/:id", Controller.delete);

  app.use("/api", router);
};
