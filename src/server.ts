import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./config/db"
import proyectRoutes from "./routes/projectRoutes"

dotenv.config()

connectDB()
const server = express()
server.use(express.json())

server.use("/api/projects", proyectRoutes)


export default server