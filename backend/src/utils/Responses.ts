import { Response } from 'express';
import {IConflictData, ResponseCodes} from "../common";
import {ValidationError} from "express-validator/lib/base";
import {Result, ResultFactory} from "express-validator";

class Responses {
    static Ok(res: Response, data: any) {
        res.status(200).json({
            success: true,
            data
        });
    }

    static NotFound(res: Response, message: string, code: ResponseCodes) {
        res.status(404).json({
            success: false,
            message: message,
            code
        });
    }

    static Conflict(res: Response, message: string | Result<ValidationError>, code: ResponseCodes) {
        res.status(409).json(   {
            success: false,
            message,
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
