import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DATABASE_URL);

export const connectDB = async () => {
    
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta.bold(`MongoDB conectado ${url}`));
            
    } catch (error) {
        console.log(colors.red.bold("Error al conectar a MongoDB"));
        process.exit(1);
    }
}


