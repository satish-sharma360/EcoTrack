import mongoose from "mongoose";
import configration from "../config/env.congi.js";

const connectDb = async () =>{
    try {
        await mongoose.connect(`${configration.DB_URL}/waste_management`)
        console.log('Database connected...')
    } catch (error) {
        console.log("Database conection error....")
        console.log(error)
        process.exit(1)
    }
}
export default connectDb