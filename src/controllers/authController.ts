import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
    static createAccount = async(req: Request, res: Response) => {
        try {
            const { password, email } = req.body
            const user = new User(req.body)

            // check if user already exists by email
            const userExists = await User.findOne({email})

            if (userExists) {
                const error = new Error("Este usuario ya esta registrado")
                res.status(409).json({error : error.message})
                return 
            }

            // hash password
            user.password = await hashPassword(password)

            await user.save()
            res.send("cuenta creada, reviza tu email para verificar tu cuenta")
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }
}