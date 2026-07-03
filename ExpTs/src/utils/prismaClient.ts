import { PrismaClient } from "../generated/prisma/client.js"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import validateEnv from "../utils/validateEnv.js"

const env = validateEnv()

const adapter = new PrismaMariaDb(env.DATABASE_URL)
const prisma = new PrismaClient({ adapter })

export default prisma