// import determineStatus from "./statusAlgorithm.js";
// import machineData from "../models/machineData.json" assert { type: "json" };

// machineData.forEach((machine) => {
//     const status = determineStatus(machine);
//     console.log(`Machine: ${machine.machineName}, Status: ${status}`);
// });

import fs from "fs";
import path from "path";
import determineStatus from "./statusAlgorithm.js";

const jsonPath = path.resolve("src/models/machineData.json");

// Read and parse the JSON file
const machineData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

// Process the machine data
machineData.forEach((machine) => {
    const status = determineStatus(machine);
    console.log(`Machine: ${machine.machineName}, Status: ${status}`);
});