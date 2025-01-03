import express from "express";
import exampleController from "../controllers/exampleController.js";
import machineRoutes from "./machines.js";

const router = express.Router();

// Example route
router.get("/", exampleController.home);

// Machines route
router.use("/machines", machineRoutes);

export default router;
