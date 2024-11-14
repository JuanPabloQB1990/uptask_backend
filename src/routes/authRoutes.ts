import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post("/create-account", 
    body("name")
        .notEmpty()
        .withMessage("Nombre es requerido"),
    body("email")
        .isEmail()
        .withMessage("Email no valido"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password requiere minimo 8 caracteres"),
    body("password_confirmation").custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Los Password no son iguales")
        }
        return true;
    }),
    handleInputErrors,
    AuthController.createAccount)

export default router