import { PrismaClient } from "../generated/prisma/client.js"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import validateEnv from "../utils/validateEnv.js"

const env = validateEnv()
const databaseUrl = new URL(env.DATABASE_URL)

const adapter = new PrismaMariaDb({
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port) || 3306,
    user: decodeURIComponent(databaseUrl.username),
    password: decodeURIComponent(databaseUrl.password),
    database: databaseUrl.pathname.replace("/", ""),
    allowPublicKeyRetrieval: true
})
const prisma = new PrismaClient({ adapter })

export default prisma
