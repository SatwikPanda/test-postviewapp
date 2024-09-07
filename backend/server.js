import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./configMDB/db.js";
import User from './models/user.model.js';

dotenv.config();

const app = express();
app.use(express.json()); //allows use to accept json data


app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } 
  catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
})

app.post("/api/users", async (req, res) => {
    const details = req.body;
    if(!details.name || !details.email || !details.photoURL) {
        return res.status(400).json({ success:false, message: "All the fields are required" });
    }

    const newUser = new User(details);

    try {
        await newUser.save();
        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const details = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "User not found" });
    }


    try {
        const updatedUser = await User.findByIdAndUpdate(id, details, {new:true});
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Error" });
    }
});

app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ success: false, message: "User not found" });
    }
})

app.listen(5000, () => {
    connectDB();
    console.log('Server listening at http://localhost:5000');
});