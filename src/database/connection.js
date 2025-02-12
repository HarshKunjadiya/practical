import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connected Successfully...");
}).catch((err) => {
    console.log("Failed to connect!!!");
    console.log(err);
})