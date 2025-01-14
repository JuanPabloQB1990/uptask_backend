import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./config/db"
import proyectRoutes from "./routes/projectRoutes"
import authRoutes from "./routes/authRoutes"
import cors from "cors"
import { corsConfig } from "./config/cors"
import morgan from "morgan"
import cookieParser from 'cookie-parser';

dotenv.config()

connectDB()
// inicializa el servidor
const server = express()

server.use(cookieParser());

// configuracion de cors
server.use(cors(corsConfig))

// logging
server.use(morgan("dev"))

//habilitar datos de un formulario
server.use(express.json())

server.use("/api/auth", authRoutes)
server.use("/api/projects", proyectRoutes)

export default server