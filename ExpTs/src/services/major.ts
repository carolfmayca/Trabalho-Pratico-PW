import { PrismaClient, type Major } from "../generated/prisma/client.js"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import validateEnv from "../utils/validateEnv.js"
import { type CreateMajorDto, type UpdateMajorDto } from "../types/major.js"

const env = validateEnv()

const adapter = new PrismaMariaDb(env.DATABASE_URL)
const prisma = new PrismaClient({ adapter })

export async function getMajors(): Promise<Major[]> {
    return prisma.major.findMany()
}
export async function createMajor(data: CreateMajorDto) {
    return prisma.major.create({ data })
}

export async function getMajor(id: string): Promise<Major | null> {
    return prisma.major.findFirst({ where: { id } })
}

export async function updateMajor(id: string, data: UpdateMajorDto): Promise<Major> {
    return prisma.major.update({ data: data, where: { id } })
}
export async function removeMajor(id: string): Promise<Major | null> {
    return prisma.major.delete({ where: { id } })
}