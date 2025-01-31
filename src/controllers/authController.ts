import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";


export class AuthController {

    static createAccount = async(req: Request, res: Response) => {
        
        try {
            const { password, email } = req.body
            
            // check if user already exists by email
            const userExists = await User.findOne({email})
            
            if (userExists) {
                const error = new Error("Este usuario ya esta registrado")
                res.status(409).json({error : error.message})
                return 
            }

            const user = new User(req.body)
            
            // hash password
            user.password = await hashPassword(password)

            // generate token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id
            
            // send email confirmation
            AuthEmail.sendEmailConfirmation({
                    email : user.email,
                    name: user.name,
                    token: token.token
            })

            await Promise.allSettled([user.save(), token.save()])
            
            res.status(201).json({message: "cuenta creada, reviza tu email para verificarla"})
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }

    static confirmAccount = async(req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExists = await Token.findOne({token})
            
            if (!tokenExists){
                const error = new Error("Token no válido")
                res.status(401).json({error : error.message})
                return
            }

            const user = await User.findById(tokenExists.user)
            user!.confirmed = true

            await Promise.allSettled([user?.save(), tokenExists.deleteOne()])

            res.json({message: "Cuenta Confirmada Correctamente"})
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }

    static login = async(req: Request, res: Response) => {

        try {
            const { email, password } = req.body
            const user = await User.findOne({email})
            if(!user) {
                const error = new Error("Usuario no registrado")
                res.status(404).json({error : error.message})
                return
            }

            if(!user.confirmed) {
                // generate token
                const token = new Token()
                token.token = generateToken()
                token.user = user.id
                await token.save()
                
                // send email confirmation
                AuthEmail.sendEmailConfirmation({
                    email : user.email,
                    name: user.name,
                    token: token.token
                })
                
                const error = new Error("La cuenta no ha sido confirmada, te hemos enviado un email para confirmar la cuenta")
                res.status(401).json({error : error.message})
                return
            }

            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error("La password es incorrecta")
                res.status(401).json({error : error.message})
                return
            }
            
            const token = generateJWT({id: user.id})

            res.json({token})
            
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }

    static requestCodeConfirmationAccount = async(req: Request, res: Response) => {
        try {
            const { email } = req.body
            
            // check if user already exists by email
            const userExists = await User.findOne({email})
            
            if (!userExists) {
                const error = new Error("Este usuario no esta registrado")
                res.status(404).json({error : error.message})
                return 
            }

            if (userExists.confirmed) {
                const error = new Error("Este usuario ya esta confirmado")
                res.status(404).json({error : error.message})
                return 
            }

            // generate token
            const token = new Token()
            token.token = generateToken()
            token.user = userExists.id
            
            // send email confirmation
            AuthEmail.sendEmailConfirmation({
                    email : userExists.email,
                    name: userExists.name,
                    token: token.token
            })
            await token.save()

            res.json({message: "se envió un nuevo token a tu email"})
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }
    static forgotPassword = async(req: Request, res: Response) => {
        try {
            const { email } = req.body
            
            // check if user already exists by email
            const userExists = await User.findOne({email})
            
            if (!userExists) {
                const error = new Error("Este usuario no esta registrado")
                res.status(404).json({error : error.message})
                return 
            }

            // generate token
            const token = new Token()
            token.token = generateToken()
            token.user = userExists.id
            await token.save()
            
            // send email confirmation
            AuthEmail.sendPasswordResetToken({
                    email : userExists.email,
                    name: userExists.name,
                    token: token.token
            })


            res.json({message: "Reviza tu email para instrucciones"})

        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }

    static validateToken = async(req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExists = await Token.findOne({token})
            
            if (!tokenExists){
                const error = new Error("Token no válido")
                res.status(401).json({error : error.message})
                return
            }

            res.json({message: "Token válido, Define tu nuevo password"})
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }

    static updatePassword = async(req: Request, res: Response) => {
        try {
            const { token } = req.params
            const { password } = req.body
            const tokenExists = await Token.findOne({token})
            
            if (!tokenExists){
                const error = new Error("Token no válido")
                res.status(401).json({error : error.message})
                return
            }

            const user = await User.findById(tokenExists.user)
            
            // hash password
            user!.password = await hashPassword(password)

            await Promise.allSettled([user?.save(), tokenExists.deleteOne()])

            res.json({message: "Password restablecida satisfactoriamente"})
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }

    static user = async(req: Request, res: Response) => {
        try {
            res.json(req.user)
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }

    static updateProfile = async(req: Request, res: Response) => {
        const { name, email } = req.body

        const userExists = await User.findOne({email})

        if (userExists && userExists.id.toString() !== req.user.id.toString()) {
            const error = new Error("Email ya registrado")
            res.status(409).json({error : error.message})
            return 
        }

        req.user.name = name
        req.user.email = email

        try {
            await req.user.save()
            res.json({message: "Perfil Actualizado"})
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }

    static updateCurrentPassword = async(req: Request, res: Response) => {
        const { current_password, password } = req.body
        
        const user = await User.findById(req.user.id)
        
        const isPasswordCorrect = await checkPassword(current_password, user!.password)
        
        if (!isPasswordCorrect) {
            const error = new Error("La contraseña actual es incorrecta")
            res.status(401).json({error : error.message})
            return
        }

        user!.password = await hashPassword(password)

        try {
            await user!.save()
            res.json({message: "Contraseña Actualizada"})
        } catch (error) {
            res.status(500).json({ error:error.message });
        }
    }

    static checkPassword = async(req: Request, res: Response) => {
        const { password } = req.body
        
        const user = await User.findById(req.user.id)
        
        const isPasswordCorrect = await checkPassword(password, user!.password)
        
        if (!isPasswordCorrect) {
            const error = new Error("La contraseña es incorrecta")
            res.status(401).json({error : error.message})
            return
        }

        res.json({message: "Contraseña Correcta"})
    }
}

