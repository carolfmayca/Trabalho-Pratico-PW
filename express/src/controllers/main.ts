import type { Request, Response } from 'express';
import { loremIpsum } from "lorem-ipsum";

const index = (req: Request, res: Response) => {
    res.end('Welcome to Web academy!');
};
const sobre = (req: Request, res: Response) => {
    res.send('Página sobre');
};
const bemvindo = (req: Request, res: Response) => {
    res.send(`Seja bem vindo ${req.params.nome}`);
};
const lorem = (req: Request, res: Response) => {
    res.send(loremIpsum({ count: Number(req.params.num), units: "paragraphs", format: "html" }))
};

const hb1 = (req: Request, res: Response) => {
    res.render('main/hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
        layout: false,
    });
};
const hb2 = (req: Request, res: Response) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
};
const hb3 = (req: Request, res: Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes, layout: false });
};
const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('main/hb4', { technologies, layout: false });
};

const testCookie = (req: Request, res: Response) => {
    if ('name-user' in req.cookies) {
        res.send(`O valor do cookie name-user ${req.cookies['name-user']}`)
    }
    else {
        res.cookie('name-user', 'Gabriela', {
            httpOnly: true,
            maxAge: 360000
        })
        res.send("O cookie ainda não tinha sido criado")
    }
}
export default { index, hb1, hb2, hb3, hb4, sobre, bemvindo, lorem, testCookie};