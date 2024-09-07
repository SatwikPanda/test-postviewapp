import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./configMDB/db.js";

dotenv.config();

const app = express();

app.get('/details', (req, res) => {
    res.send("Server is Ready");
})

app.listen(5000, () => {
    connectDB();
    console.log('Server listening at http://localhost:5000');
});