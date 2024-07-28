import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse  } from "next/server";
import { getDatafromToken } from "@/helpers/getDatafromToken";

connectDB();

export async function GET(request : NextRequest){
    try {
        // Extract data from token
        const userId = await getDatafromToken(request);

        // Find user by id
        const user = await User.findOne({_id: userId}).select("-password");

        if(!user){
            return NextResponse.json(
                {
                    "error": "Invalid Token",
                    "success": false
                },
                {status: 404}
            )
        }

        return NextResponse.json(
            {
                "message": "User found",
                "success": true,
                data : user
            }
        )
        
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error : "Server error",
                "success": false
            }, 
            {status: 500});
        
    }
}