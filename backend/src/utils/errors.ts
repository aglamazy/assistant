import { Response } from 'express';

export const ControllerError = (res: Response, error: any) => {
    console.error(`Error in ${(new Error()).stack?.split("\n")[2].trim()}`);
    // console.error(error);
    let message;
    let code = 500;
    if (typeof error == "string") {
        code = 400;
        message = error;
    } else {
        switch (error.code) {
            default:
                message = error.message;
                if (error.code >= 200 && error.code <= 600) code = error.code;
        }
        if (error.original?.errors) {
            message = `Error executing ${error.original.sql}: ${error.original.errors.join("\n")}`;
            console.error(message);
            if (process.env.NODE_ENV !== "Local") message = "data error";
        }
    }
    return res.status(code).json({
        success: false,
        data: message
    });
};
