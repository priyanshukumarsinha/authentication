import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse  } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";


connectDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        // Check if user already exists
        // validation 

        const user = await User.findOne({ email})

        if(user){
            return NextResponse.json({ error: "User already Exists" }, { status: 400 });
        }

        // Hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log("User saved", savedUser);

        // Send Verification Email
        await sendMail({
            email, 
            emailType : 'VERIFY',
            userId : savedUser._id
        })

        return NextResponse.json(
            { 
                message: "User registered successfully",
                success : "true",
                user : savedUser
            }, 
            { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

