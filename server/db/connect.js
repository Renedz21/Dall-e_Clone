import mongoose from "mongoose";

const connectDB = async (url) => {
    try {
        mongoose.set('strictQuery', true)
        mongoose.connect(url);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;