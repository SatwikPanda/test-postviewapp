import connect from "@/app/lib/db";
import User from "@/app/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server"

const ObjectId = require('mongoose').Types.ObjectId;

export const GET = async () => {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err) {
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const newUser = new User(body);
        await newUser.save();

        return new NextResponse(JSON.stringify({message: "User created successfully", user: newUser}), { status: 200 });

    } catch (err) {
        return new NextResponse(JSON.stringify({message: "Error in creating user", error: err}), { status: 500 });
    }
}

export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { userId, newUsername } = body;

        await connect();
        if(!userId || !newUsername) {
            return new NextResponse(JSON.stringify({message: "ID or new Username not found"}), { status: 400 });
        }
        if(!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "Invalid ID"}), { status: 400 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { username: newUsername },
            { new: true }
        );

        if(!updatedUser) {
            return new NextResponse(JSON.stringify({message: "User not found"}), { status: 404 });
        }

        return new NextResponse(JSON.stringify({message: "User updated successfully", user: updatedUser}), { status: 200 });

    } catch (err) {
        return new NextResponse(JSON.stringify({message: "Error in updating user", error: err}), { status: 500 });
    }
}

export const DELETE = async (request: Request) => {
    try {
        const {searchParams}= new URL(request.url);
        const userId = searchParams.get("userId");

        if(!userId) {
            return new NextResponse(JSON.stringify({message: "ID not found"}), { status: 404 });
        }

        if(!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "Invalid ID"}), { status: 400 });
        }

        await connect();

        const deletedUser = await User.findByIdAndDelete(
            new Types.ObjectId(userId)
        );

        if(!deletedUser) {
            return new NextResponse(JSON.stringify({message: "User not found"}), { status: 404 });
        }

        return new NextResponse(JSON.stringify({message: "User deleted successfully", user: deletedUser}), { status: 200 });
    } catch (err) {
        return new NextResponse(JSON.stringify({message: "Error in deleting user", error: err}), { status: 500 });
    }
}