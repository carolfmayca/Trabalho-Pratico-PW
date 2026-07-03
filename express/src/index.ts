import express from "express";
import validateEnv from './utils/validateEnv.js';
import dotenv from 'dotenv';
import path from "path";
import router from './router/router.js';
import * as helpers from './views/helpers/helpers.js';
import { engine } from 'express-handlebars';
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import session from "express-session"
import { v4 as uuidv4 } from "uuid"
import logger from "./middlewares/logger.js";

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
app.use(express.static(path.join(__dirname, "../public")));
app.use('/jogo', express.static(path.join(__dirname, '../../game')));

const PORT = Number(process.env.PORT) || 3333;

app.use(logger("completo"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
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
    next()
})
app.use(router)

app.use((req, res) => {
    res.statusCode = 404;
    res.send("404!");
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
