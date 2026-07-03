import type { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.uid) {
        return res.redirect("/login");
    }
    next();
};

export default requireAuth;
