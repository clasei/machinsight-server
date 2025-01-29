import express, { Request, Response } from "express";
import machineData from "../models/machineData.json";
import determineStatus from "../utils/statusAlgorithm";

const router = express.Router();

// route to fetch all machine data with filters and pagination
router.get("/", (req: Request, res: Response) => {
    const { status, location, page = "1", limit = "49" } = req.query as { status?: string; location?: string; page?: string; limit?: string };

    // update the status of machines dynamically
    const updatedData = machineData.map(machine => ({
        ...machine,
        status: determineStatus(machine),
    }));

    let filteredData = updatedData;

    // filter by status
    if (status) {
        filteredData = filteredData.filter(machine => machine.status === status);
    }

    // filter by location
    if (location) {
        filteredData = filteredData.filter(machine => machine.location === location);
    }

    // pagination logic
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = Number(page) * Number(limit);
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // send paginated and filtered data
    res.json({
        totalItems: filteredData.length,
        totalPages: Math.ceil(filteredData.length / Number(limit)),
        currentPage: parseInt(String(page), 10),
        data: paginatedData,
    });
});

export default router;
