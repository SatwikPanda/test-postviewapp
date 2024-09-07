import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json({ success: true, data: users });
    } 
    catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const createUser = async (req, res) => {
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
}

export const updateUser = async (req, res) => {
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
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Error" });
    }
}