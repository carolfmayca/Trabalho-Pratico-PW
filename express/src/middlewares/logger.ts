import type { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";

type LoggerFormat = "simples" | "completo";

const logger = (format: LoggerFormat) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const logsPath = process.env.LOGS_PATH as string;

        await fs.mkdir(logsPath, { recursive: true });

        const data = [
            new Date().toISOString(),
            req.url,
            req.method
        ];

        if (format === "completo") {
            data.push(req.httpVersion, req.get("User-Agent") || "");
        }

        await fs.appendFile(path.join(logsPath, "access.log"), `${data.join(", ")}\n`);
        next();
    };
};

export default logger;
