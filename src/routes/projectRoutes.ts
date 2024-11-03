import { Router } from "express"
import { ProjectController } from "../controllers/projectController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"

const router = Router()

router.post("/",
    body("projectName")
        .notEmpty()
        .withMessage("El nombre del projecto es obligatorio"),
    body("clientName")
        .notEmpty()
        .withMessage("El cliente del Proyecto es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripción del Proyecto es obligatorio"),
    handleInputErrors,
    ProjectController.createProject)

router.get("/", ProjectController.getAllProjects)

router.get("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id no valido"),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id no valido"),
    body("projectName")
        .notEmpty()
        .withMessage("El nombre del projecto es obligatorio"),
    body("clientName")
        .notEmpty()
        .withMessage("El cliente del Proyecto es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripción del Proyecto es obligatorio"),
    handleInputErrors,
    handleInputErrors,
    ProjectController.updateProjectById
)

router.delete("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id no valido"),
    handleInputErrors,
    ProjectController.deleteProjectById
)

export default router