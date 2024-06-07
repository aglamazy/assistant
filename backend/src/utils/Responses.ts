import { Response } from 'express';
import {IConflictData, ResponseCodes} from "../common";

class Responses {
    static Ok(res: Response, message: string) {
        res.status(200).json({
            success: true,
            message: message
        });
    }

    static NotFound(res: Response, message: string, code: ResponseCodes) {
        res.status(404).json({
            success: false,
            message: message,
            code
        });
    }

    static Conflict(res: Response, message: string, code: ResponseCodes) {
        res.status(409).json(   {
            success: false,
            message: message,
            code
        } as IConflictData);
    }

    static BadRequest(res: Response, message: string) {
        res.status(400).json({
            success: false,
            message: message
        });
    }

    static InternalServerError(res: Response, message: string) {
        res.status(500).json({
            success: false,
            message: message
        });
    }
}

export default Responses;
