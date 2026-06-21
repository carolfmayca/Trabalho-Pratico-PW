import type { Request, Response } from "express";

const signup = (req: Request, res: Response) => {
    if (req.method === 'GET') {
        res.render("auth/signup")
    }
}
const login = (req: Request, res: Response) => {

}
const logout = (req: Request, res: Response) => {

}

export default { signup, login, logout }
