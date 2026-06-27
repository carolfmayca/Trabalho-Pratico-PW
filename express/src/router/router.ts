import { Router } from 'express';
import mainController from '../controllers/main.js';
import majorController from '../controllers/major.js';
import authController from '../controllers/auth.js'
import gameController from "../controllers/game.js"

const router = Router();

router.get('/', mainController.index);
router.get('/lorem/:num', mainController.lorem);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/sobre', mainController.sobre);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

router.get("/majors/", majorController.index)
router.all("/majors/create", majorController.create)
router.get("/majors/read/:id", majorController.read)
router.all("/majors/update/:id", majorController.update)
router.post("/majors/remove/:id", majorController.remove)

router.get("/cookie", mainController.testCookie)

router.all("/signup", authController.signup)
router.all("/login", authController.login)
router.get("/logout", authController.logout)


router.get("/play", gameController.play)
router.get("/about", gameController.about)


export default router;