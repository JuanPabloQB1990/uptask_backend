import { Router } from "express"
import { ProjectController } from "../controllers/projectController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
import { TaskController } from "../controllers/taskController"
import { validateProjectsExists } from "../middleware/projects"
import { hasAuthorization, taskBelongToProject, validateTasksExists } from "../middleware/tasks"
import { authenticate } from "../middleware/auth"
import { TeamMemberController } from "../controllers/teamController"
import { NoteController } from "../controllers/noteController"

const router = Router()

router.use(authenticate)

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

router.get("/",
    ProjectController.getAllProjects)

router.get("/:id",
    param("id")
        .isMongoId()
        .withMessage("Id no valido"),
    handleInputErrors,
    ProjectController.getProjectById
)

router.param("projectId", validateProjectsExists)
router.put("/:projectId",
    param("projectId")
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
    hasAuthorization,
    ProjectController.updateProjectById
)

router.delete("/:projectId",
    param("projectId")
        .isMongoId()
        .withMessage("Id no valido"),
    handleInputErrors,
    hasAuthorization,
    ProjectController.deleteProjectById
)


/** Route for Tasks*/
router.post("/:projectId/tasks", 
    //validateProjectsExists,
    hasAuthorization,
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
    hasAuthorization,
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
    hasAuthorization,
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

/// Route for team
router.post("/:projectId/team/find",
    body("email")
        .isEmail()
        .withMessage("El email es invalido"),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)

router.get("/:projectId/team",
    TeamMemberController.getProjectMembers
)

router.post("/:projectId/team",
    body("id")
        .isMongoId()
        .withMessage("El id es invalido"),
    handleInputErrors,
    TeamMemberController.addMemberById
)

router.delete("/:projectId/team/:userId",
    param("userId")
        .isMongoId()
        .withMessage("El id es invalido"),
    handleInputErrors,
    TeamMemberController.removeMemberById
)

/** Routes for notes */

router.post("/:projectId/tasks/:taskId/notes", 
    body("content")
        .notEmpty()
        .withMessage("El contenido es obligatorio"),
    handleInputErrors,
    NoteController.createNote
)

router.get("/:projectId/tasks/:taskId/notes", 
    handleInputErrors,
    NoteController.getTaskNotes
)

router.delete("/:projectId/tasks/:taskId/notes/:noteId", 
    param("noteId")
        .isMongoId()
        .withMessage("El id es invalido"),
    handleInputErrors,
    NoteController.deleteNoteById
)


export default router