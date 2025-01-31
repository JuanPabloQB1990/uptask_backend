import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router()

router.post("/create-account", 
    // body("name")
    //     .notEmpty()
    //     .withMessage("El Nombre es requerido"),
    // body("email")
    //     .isEmail()
    //     .withMessage("El Email no valido"),
    // body("password")
    //     .isLength({ min: 8 })
    //     .withMessage("Password requiere minimo 8 caracteres"),
    // body("password_confirmation").custom((value, {req}) => {
    //     if (value !== req.body.password) {
    //         throw new Error("Los Password no son iguales")
    //     }
    //     return true;
    // }),
    // handleInputErrors,
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

router.post("/forgot-password", 
    body("email")
        .isEmail()
        .withMessage("El Email no valido"),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post("/validate-token", 
    body("token")
        .notEmpty()
        .withMessage("El Token es requerido"),
    handleInputErrors,
    AuthController.validateToken
)

router.post("/update-password/:token", 
    param("token")
        .isNumeric()
        .withMessage("El Token no es valido"),
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
    AuthController.updatePassword
)

router.get("/user", 
    authenticate,
    AuthController.user
)

/** Profile */
router.put("/profile", 
    authenticate,
    body("name")
        .notEmpty()
        .withMessage("El Nombre es requerido"),
    body("email")
        .isEmail()
        .withMessage("El Email no valido"),
    handleInputErrors,
    AuthController.updateProfile
)

router.post("/update-password", 
    authenticate,
    body("current_password")
        .notEmpty()
        .withMessage("La Password actual es requerida"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password requiere minimo 8 caracteres"),
    body("password_confirmation").custom((value, {req}) => {
        if (value!== req.body.password) {
            throw new Error("Los Password no son iguales")
        }
        return true;
    }),
    handleInputErrors,
    AuthController.updateCurrentPassword
)

router.post("/check-password", 
    authenticate,
    body("password")
        .notEmpty()
        .withMessage("La Password actual es requerida"),
    handleInputErrors,
    AuthController.checkPassword
)

export default router