import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import routes from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// middleware
app.use(cors());
app.use(express.json());

// main Routes
app.use("/api", routes);

// new endpoint to receive machine data from FastAPI
app.post("/upload-data", (req, res) => {
    try {
        const machineData = req.body;

        // save data to a local JSON file -- for now
        fs.writeFileSync("./src/models/machineData.json", JSON.stringify(machineData, null, 2));

        console.log("data received and saved");
        res.status(200).json({ message: "Data received" });
    } catch (error) {
        console.error("error saving data:", error);
        res.status(500).json({ message: "Failed to save data." });
    }
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
