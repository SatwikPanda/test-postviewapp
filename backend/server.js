import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./configMDB/db.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
app.use(express.json()); //allows use to accept json data
app.use("/api/users", userRoutes)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at http://localhost:${PORT}`);
});