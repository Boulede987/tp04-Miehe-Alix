

module.exports = app => {
  const user = require("../controllers/user.controllers.js");

  var router = require("express").Router();

  // User routes
  router.get("/", user.get);          // GET all users
  router.get("/:id", user.getById);   // GET user by ID
  router.post("/", user.post);        // CREATE new user
  router.put("/:id", user.put);       // UPDATE user by ID
  router.delete("/:id", user.delete);// DELETE user by ID

  // Prefix all routes with /api/user
  app.use("/api/user", router);
};
