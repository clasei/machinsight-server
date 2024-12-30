const express = require("express");
const router = express.Router();
const exampleController = require("../controllers/exampleController");
const machineRoutes = require("./machines");

// Example route
router.get("/", exampleController.home);

// Machines route
router.use("/machines", machineRoutes);

module.exports = router;
