import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse  } from "next/server";

connectDB();

export async function GET(request : NextRequest){
    try {
        console.log("Logging out user");
        const response = NextResponse.json(
            {
                "message": "User logged out Successfully",
                "success": true,
            }
        )


        response.cookies.set("token", "",
            {
                httpOnly: true,
                expires : new Date(0)
            },
        )

        return response;
        
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