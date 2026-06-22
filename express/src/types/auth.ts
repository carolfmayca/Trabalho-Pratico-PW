import { type User } from "../generated/prisma/client.js"

export type SignupDto = Pick<User, "name" | "email" | "password" | "majorId">
export type LoginDto = Pick<User, "email" | "password">