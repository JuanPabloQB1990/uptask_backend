import jwt from "jsonwebtoken"
import { Types } from "mongoose"
import dotenv from "dotenv"

dotenv.config()

type UserPayload = {
    id: Types.ObjectId
}

export const generateJWT = (payload : UserPayload) => {
    console.log(process.env.JWT_SECRET);
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" })
     
}

