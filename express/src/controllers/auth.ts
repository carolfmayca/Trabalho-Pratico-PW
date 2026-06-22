import type { Request, Response } from "express";
import type { SignupDto, LoginDto } from "../types/auth.js"
import { getMajors } from "../services/major.js";
import { checkCredentials, createUser } from "../services/auth.js";

const signup = async (req: Request, res: Response) => {
    const majors = await getMajors()
    if (req.method === "GET") {
        res.render("auth/signup", {
            majors
        })
    }

    else if (req.method === "POST") {
        const data = req.body as SignupDto
        try {
            const user = await createUser(data)
            res.redirect("/login")
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

const login = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        res.render("auth/login")
    }
    else if (req.method === "POST") {
        const data = req.body as LoginDto
        try {
            const user = await checkCredentials(data)
            if (user) {
                req.session.uid = user.id
                res.redirect("/play")
            }
            else {
                res.redirect("/login")
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}
const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            res.status(500).json(err)
        }
        res.redirect("/login")
    })
}

export default { signup, login, logout }
