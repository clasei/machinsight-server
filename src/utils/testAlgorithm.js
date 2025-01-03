import determineStatus from "./statusAlgorithm.js";
import machineData from "../models/machineData.json" assert { type: "json" };

machineData.forEach((machine) => {
    const status = determineStatus(machine);
    console.log(`Machine: ${machine.machineName}, Status: ${status}`);
});