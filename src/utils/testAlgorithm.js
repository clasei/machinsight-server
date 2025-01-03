const determineStatus = require("./statusAlgorithm");
const machineData = require("../models/machineData.json");

machineData.forEach((machine) => {
    const status = determineStatus(machine);
    console.log(`Machine: ${machine.machineName}, Status: ${status}`);
});
