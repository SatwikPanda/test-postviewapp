import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./configMDB/db.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
app.use(express.json()); //allows use to accept json data
app.use("/api/users", userRoutes)



app.listen(5000, () => {
    connectDB();
    console.log('Server listening at http://localhost:5000');
});