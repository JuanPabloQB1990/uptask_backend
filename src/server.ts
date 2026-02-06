import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./config/db.js"
import proyectRoutes from "./routes/projectRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"
import { corsConfig } from "./config/cors.js"
import morgan from "morgan"
import cookieParser from 'cookie-parser';


dotenv.config()

// inicializa el servidor
const server = express()

if (process.env.NODE_ENV !== 'test') {
    connectDB()
    // configuracion de cors
    server.use(cors(corsConfig))
}

server.use(cookieParser());

// logging
server.use(morgan("dev"))

//habilitar datos de un formulario
server.use(express.json())

server.use("/api/auth", authRoutes)
server.use("/api/projects", proyectRoutes)

export default server

