import bcrypt from "bcryptjs"

export const hashPassword = async(password : string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

export const checkPassword = (inputPassword: string, hashPassword: string) => {
    return bcrypt.compare(inputPassword, hashPassword)
}

