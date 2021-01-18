
import express from "express";
import ValidationError from "../validation/ValidationError";

export default function (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    
    if(error instanceof ValidationError)
        res.status(401).send(error.message)
    else
        res.status(405).send('Something broke!')
}