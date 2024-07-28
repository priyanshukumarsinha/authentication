import mongoose from "mongoose";

export async function connectDB() {
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to MongoDB Database");
        })

        connection.on('error', (err) => {
            console.log("Error while connecting to MongoDB Database ::", err);
            process.exit(1);
        })
    }
    catch(err){
        console.log("Something Went Wrong :: While Connecting to Database ::", err);
    }
}