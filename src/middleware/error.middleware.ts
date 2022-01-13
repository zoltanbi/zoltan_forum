import { Request, Response, NextFunction, response } from "express"
import { HttpError } from "../error/httpError"

export const errorMiddleware = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof HttpError) {
        const httpError: HttpError = <HttpError>err;

        res.status(httpError.statusCode).json({
            statusCode: httpError.statusCode,
            message: httpError.message,
        });

        return;
    }

    res.status(500).json({
        statusCode: 500,
        message: err.message,
    });
};

