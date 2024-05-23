import Logger from './logger';
import {NextFunction, Response, Request} from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    Logger.api(`Processing started: ${req.method} ${req.url}`);
    next();
};

export default requestLogger;