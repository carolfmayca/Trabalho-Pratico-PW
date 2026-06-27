import type { Request, Response } from "express"
const play = (req: Request, res: Response) => {
    res.render("game/play")
}

const about = (req: Request, res: Response) => {
    res.render("game/about")
}
export default { play, about }