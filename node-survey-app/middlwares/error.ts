
import express from "express";
import BadRequestError from "../errors/BadRequestError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import ValidationError from "../errors/ValidationError";

export default function (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {

    if (error instanceof ValidationError)
        res.status(400).send({ success: false, message: error.message })
    else if (error instanceof UnauthorizedError)
        res.status(401).send({ success: false, message: error.message })
    else if (error instanceof BadRequestError)
        res.status(400).send({ success: false, message: error.message })
    else if (error instanceof NotFoundError)
        res.status(404).send({ success: false, message: error.message })
    else {
        console.log(error);
        res.status(500).send({ success: false, message: 'Server Error' })
    }
}