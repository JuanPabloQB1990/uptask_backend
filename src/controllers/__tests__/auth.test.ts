import request from "supertest"
import server from "../../server"
import mongoose from "mongoose"
import User from "../../models/User"
import { AuthEmail } from "../../emails/AuthEmail"

describe("POST - /api/auth", () => {
    
    jest.mock("../../emails/AuthEmail")
    

    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/uptask")
        await User.deleteMany({})
        
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    it("Deberia registrar usuario", async () => {
        const response = await request(server).post("/api/auth/create-account").send({
            name: "Faber",
            email: "faber@gmail.com",
            password: "faber1213456",
            password_confirmation : "faber1213456"
        })
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("message")
        expect(AuthEmail.sendEmailConfirmation).toHaveBeenCalled()
        
    })
})