import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse  } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const { emailorUsername, password } = reqBody;     

        // check if email or username is provided
        if(!emailorUsername){
            return NextResponse.json(
                {
                    error : "Email or username is required",
                    "success": false
                }, 
                {status: 400});
        }
        
        // check if password is provided
        if(!password){
            return NextResponse.json(
                {
                    error : "Password is required",
                    "success": false
                }, 
                {status: 400});
        }

        // find user by email or username
        const user = await User.findOne({$or: [{email: emailorUsername}, {username: emailorUsername}]});

        // check if user exists
        if(!user){
            return NextResponse.json(
                {
                    error : "User not found",
                    "success": false
                }, 
                {status: 404});
        }

        // check if password is correct
        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch){
            return NextResponse.json(
                {
                    error : "Bad credentials",
                    "success": false
                }, 
                {status: 400});
        }

        // JWT token
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response =  NextResponse.json(
            {
                message : "Login successful",
                "success": true,
                token
            }, 
            {status: 200}
        );

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    } catch (error:any) {
        return NextResponse.json(
            {
                error : "Login failed",
                message : error.message,
                "success": false
            }, 
            {status: 500});
        
    }
}