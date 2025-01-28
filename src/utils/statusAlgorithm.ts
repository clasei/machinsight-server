type Machine = {
    temperature: number;
    vibration: number;
    fuelLevel: number;
    workHours: number;
};

const determineStatus = (machine: Machine) => {
  let status = "normal";
  let warningCount = 0;

  // Check temperature
  if (machine.temperature >= 100) {
      status = "critical";
  } else if (machine.temperature >= 90) {
      warningCount++;
  }

  // Check vibration
  if (machine.vibration >= 30) {
      status = "critical";
  } else if (machine.vibration >= 20) {
      warningCount++;
  }

  // Check fuel level
  if (machine.fuelLevel < 10) {
      status = "critical";
  } else if (machine.fuelLevel < 20) {
      warningCount++;
  }

  // Check work hours since last maintenance
  if (machine.workHours > 4000) {
      status = "critical";
  } else if (machine.workHours > 3000) {
      warningCount++;
  }

  // Escalate to critical if 4 or more warnings
  if (warningCount >= 4) {
      status = "critical";
  } else if (warningCount > 0 && status !== "critical") {
      status = "warning";
  }

  return status;
};

export default determineStatus;