import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDatabase = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

export const closeDatabase = async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB Connection Closed");
    } catch (error) {
        console.error("Error Closing Database:", error.message);
    }
};