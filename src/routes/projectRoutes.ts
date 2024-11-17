import { Router } from "express"
import { ProjectController } from "../controllers/projectController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
import { TaskController } from "../controllers/taskController"
import { validateProjectsExists } from "../middleware/projects"
import { taskBelongToProject, validateTasksExists } from "../middleware/tasks"
import { authenticate } from "../middleware/auth"

const router = Router()

router.post("/",
    authenticate,
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
    ProjectController.updateProjectById
)

router.delete("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id no valido"),
    handleInputErrors,
    ProjectController.deleteProjectById
)

router.param("projectId", validateProjectsExists)
router.post("/:projectId/tasks", 
    //validateProjectsExists,
    param("projectId")
        .isMongoId()
        .withMessage("Id no valido"),
    body("name")
        .notEmpty()
        .withMessage("El nombre de la tarea es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripción de la tarea es obligatoria"),
    handleInputErrors,
    TaskController.createTask
)


router.get("/:projectId/tasks", 
    //validateProjectsExists,
    param("projectId")
        .isMongoId()
        .withMessage("Id no valido"),
    handleInputErrors,
    TaskController.getProjectTasks
)

router.param("taskId", validateTasksExists)
router.param("taskId", taskBelongToProject)
router.get("/:projectId/tasks/:taskId", 
    //validateProjectsExists,
    //validateTasksExists,
    //taskBelongToProject,
    param("taskId")
        .isMongoId()
        .withMessage("Id no valido"),
    param("projectId")
        .isMongoId()
        .withMessage("Id no valido"),
    handleInputErrors,
    TaskController.getTaskById
)

router.put("/:projectId/tasks/:taskId", 
    //validateProjectsExists,
    //validateTasksExists,
    //taskBelongToProject,
    param("taskId")
        .isMongoId()
        .withMessage("Id no valido"),
    param("projectId")
        .isMongoId()
        .withMessage("Id no valido"),
    body("name")
        .notEmpty()
        .withMessage("El nombre de la tarea es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripción de la tarea es obligatoria"),
    handleInputErrors,
    TaskController.updateTaskById
)

router.delete("/:projectId/tasks/:taskId", 
    //validateProjectsExists,
    //validateTasksExists,
    //taskBelongToProject,
    param("taskId")
        .isMongoId()
        .withMessage("Id no valido"),
    param("projectId")
        .isMongoId()
        .withMessage("Id no valido"),
    handleInputErrors,
    TaskController.deleteTaskById
)

router.post("/:projectId/tasks/:taskId/status", 
    //validateProjectsExists,
    //validateTasksExists,
    //taskBelongToProject,
    param("taskId")
        .isMongoId()
        .withMessage("Id no valido"),
    param("projectId")
        .isMongoId()
        .withMessage("Id no valido"),
    body("status")
        .notEmpty()
        .withMessage("El estado de la tarea es obligatorio"),
    handleInputErrors,
    TaskController.updateStatusTaskById
)
export default router