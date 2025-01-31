import { Server } from "socket.io";
import server from "./server";
import colors from "colors";
import http from "http";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(server);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on("connection", (socket) => {
    console.log(colors.green.bold("Conectado a socket.io"));

    socket.on("open project", (project) => {
        socket.join(project)
    })

    socket.on("new task", (task) => {
        const project = task.project
        socket.to(project).emit("added task", task)
    })

    socket.on("delete task", (task) => {
        const project = task.project
        socket.to(project).emit("deleted task", task)
    })

    socket.on("edit task", (task) => {
        const project = task.project
        socket.to(project).emit("edited task", task)
    })

    socket.on("open task", (task) => {
        socket.join(task)
    })

    socket.on("new note", (task) => {
        socket.to(task).emit("added note", task)
    })

    socket.on("delete note", (task) => {
        socket.to(task).emit("deleted note", task)
    })

    socket.on("open projects", (userId) => {
        socket.join(userId)
    })
    
    socket.on("new member", (userId) => {
        socket.to(userId).emit("added member", userId)
    })

    socket.on("delete member", (userId) => {
        socket.to(userId).emit("deleted member", userId)
    })

})

httpServer.listen(PORT, () => {
    console.log(colors.blue.bold(`http://localhost:${PORT}`));
})
