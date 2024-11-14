import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post("/create-account", 
    body("name")
        .notEmpty()
        .withMessage("El Nombre es requerido"),
    body("email")
        .isEmail()
        .withMessage("El Email no valido"),
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
    AuthController.createAccount
)

router.post("/confirm-account", 
    body("token")
        .notEmpty()
        .withMessage("El Token es requerido"),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post("/login", 
    body("email")
        .isEmail()
        .withMessage("El Email no valido"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password requiere minimo 8 caracteres"),
    handleInputErrors,
    AuthController.login
)

router.post("/request-code", 
    body("email")
        .isEmail()
        .withMessage("El Email no valido"),
    handleInputErrors,
    AuthController.requestCodeConfirmationAccount
)

export default router