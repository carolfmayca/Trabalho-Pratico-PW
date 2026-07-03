import type { Request, Response } from "express"
import { saveScore, getTopScores } from "../services/game.js"

const play = (req: Request, res: Response) => {
    res.render("game/play", { layout: "game" })
}

const about = (req: Request, res: Response) => {
    res.render("game/about")
}

const score = async (req: Request, res: Response) => {
    const userId = req.session.uid as string;
    const { score } = req.body as { score: number };

    try {
        const session = await saveScore(userId, Number(score));
        res.status(201).json({ id: session.id, score: session.score });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao salvar pontuação" });
    }
}

const ranking = async (req: Request, res: Response) => {
    try {
        const entries = await getTopScores(10);
        res.render("game/ranking", { entries, hasEntries: entries.length > 0 });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao carregar ranking");
    }
}

export default { play, about, score, ranking }