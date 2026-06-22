import express from "express";
import type { Request, Response, NextFunction } from "express";
import validateEnv from './utils/validateEnv.js';
import dotenv from 'dotenv';
import fs from "fs/promises";
import path from "path";
import router from './router/router.js';
import * as helpers from './views/helpers/helpers.js';
import { engine } from 'express-handlebars';
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import session from "express-session"
import { v4 as uuidv4 } from "uuid"

declare module 'express-session' {
    interface SessionData {
        uid: string
    }
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR_VIEWS = path.join(__dirname, "../src/views")

dotenv.config();
validateEnv();

const app = express();

app.engine("handlebars", engine({
    helpers: helpers,
    layoutsDir: path.join(DIR_VIEWS, "/layouts"),
    defaultLayout: 'main',
}));
app.set("view engine", "handlebars");
app.set("views", DIR_VIEWS);

const PORT = Number(process.env.PORT) || 3333;
const OUTDIR = process.env.OUTDIR as string;

app.use(async (req: Request, res: Response, next: NextFunction) => {
    await fs.mkdir(OUTDIR, { recursive: true })
    // const log = `${new Date().toISOString()}, ${req.url}, ${req.method}\n`;
    const log = `${new Date().toISOString()}, ${req.url}, ${req.method}, ${req.httpVersion}, ${req.get("User-Agent")}\n`;
    await fs.appendFile(path.join(OUTDIR, "access.log"), log)
    next()
});
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    name: 'sid',
    genid: () => uuidv4(),
    secret: process.env.SECRET as string,
    resave: false, // evitar recria o cookie a cada sessao 
    saveUninitialized: false,
    rolling: true, // sessao recriada sempre
    cookie: {
        httpOnly: true,
        maxAge: 36000

    }
}))
app.use((req, res, next) => {
    res.locals.logged = !!req.session.uid
})
app.use(router)

app.use((req, res) => {
    res.statusCode = 404;
    res.send("404!");
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
