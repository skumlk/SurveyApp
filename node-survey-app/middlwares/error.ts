
import express from "express";
import BadRequestError from "../errors/BadRequestError";
import UnauthorizedError from "../errors/UnauthorizedError";
import ValidationError from "../validation/ValidationError";

export default function (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {

    if (error instanceof ValidationError)
        res.status(400).send({ success: false, message: error.message })
    else if (error instanceof UnauthorizedError)
        res.status(401).send({ success: false, message: error.message })
    else if (error instanceof BadRequestError)
        res.status(400).send({ success: false, message: error.message })
    else
        res.status(500).send({ success: false, message: 'Server Error' })
}