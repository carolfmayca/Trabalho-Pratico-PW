import { type User } from "../generated/prisma/client.js"

export type SignupDto = Pick<User, "name" | "email" | "password" | "majorId">
export type SignupFormDto = SignupDto & {
    confirmPassword: string
}
export type LoginDto = Pick<User, "email" | "password">
