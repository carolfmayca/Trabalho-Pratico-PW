import type { Request, Response } from "express";
import { type CreateMajorDto, type UpdateMajorDto } from "../types/major.js"
import { createMajor, getMajors, getMajor, updateMajor, removeMajor } from "../services/major.js"


const index = async (req: Request, res: Response) => {
    const majors = await getMajors()
    res.render("major/index", {
        majors,
        hasMajors: majors.length > 0
    })
}
const create = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        res.render("major/create", {
            formAction: "/majors/create",
            submitLabel: "Criar curso",
            cancelHref: "/majors"
        })
    }
    else if (req.method === "POST") {
        const major = req.body as CreateMajorDto;
        try {
            await createMajor(major)
            res.redirect("/majors")
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
}
const read = async (req: Request, res: Response) => {
    const id = req.params.id as string
    try {
        const major = await getMajor(id)
        res.render("major/read", {
            major,
            hasDescription: !!major?.description // se tiver um description
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
const update = async (req: Request, res: Response) => {
    const id = req.params.id as string
    if (req.method === "GET") {
        const major = await getMajor(id)
        res.render("major/update", {
            major,
            formAction: `/majors/update/${id}`,
            submitLabel: "Atualizar curso",
            cancelHref: `/majors/read/${id}`
        })
    }
    else if (req.method === "POST") {
        const major = req.body as UpdateMajorDto
        try {
            await updateMajor(id, major)
            res.redirect(`/majors/read/${id}`)
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
}
const remove = async (req: Request, res: Response) => {
    const id = req.params.id as string
    try {
        const major = await removeMajor(id)
        if (!major) return res.status(400).send("")
        if (req.get("X-Requested-With") === "XMLHttpRequest") {
            return res.status(204).send()
        }
        res.redirect("/majors")
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export default { index, read, create, update, remove }
