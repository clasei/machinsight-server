import express from "express";
import mockData from "../models/machineData.json" assert { type: "json" };
import determineStatus from "../utils/statusAlgorithm.js";

const router = express.Router();

// Route to fetch all machine data with filters and pagination
router.get("/", (req, res) => {
    const { status, location, page = 1, limit = 10 } = req.query;

    // Update the status of machines dynamically
    const updatedData = mockData.map(machine => ({
        ...machine,
        status: determineStatus(machine),
    }));

    let filteredData = updatedData;

    // Filter by status
    if (status) {
        filteredData = filteredData.filter(machine => machine.status === status);
    }

    // Filter by location
    if (location) {
        filteredData = filteredData.filter(machine => machine.location === location);
    }

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Send paginated and filtered data
    res.json({
        totalItems: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
        currentPage: parseInt(page, 10),
        data: paginatedData,
    });
});

export default router;
