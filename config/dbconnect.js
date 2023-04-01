import mongoose from "mongoose";

const dbconnect=async ()=>{
    try {
        const connected = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected at ${connected.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

export default dbconnect;