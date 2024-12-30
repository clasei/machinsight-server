const express = require("express");
const router = express.Router();
const mockData = require("../models/machineData.json");

// // Route to fetch all machine data
// router.get("/", (req, res) => {
//     res.json(mockData);
// });

// Route to fetch all machine data with filters and pagination
router.get("/", (req, res) => {
  const { status, location, page = 1, limit = 10 } = req.query;

  let filteredData = mockData;

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

module.exports = router;
