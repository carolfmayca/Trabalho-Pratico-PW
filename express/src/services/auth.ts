import type { SignupDto, LoginDto } from "../types/auth.js"
import { type User } from "../generated/prisma/client.js"
import prisma from "../utils/prismaClient.js"
import { genSalt, hash, compare } from "bcryptjs"
import validateEnv from "../utils/validateEnv.js"

const env = validateEnv()
export async function createUser(data: SignupDto): Promise<User> {
    const salt = await genSalt(env.BCRYPT_ROUNDS)
    const password = await hash(data.password, salt)
    return prisma.user.create({
        data: {
            ...data,
            password
        }
    })
}

export async function checkCredentials(data: LoginDto): Promise<null | User> {
    const user = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })
    const ok = await compare(data.password, user ? user.password : "FAKEHASH")
    if (!ok) return null
    return user
}
