
import express from "express";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/UnauthorizedError";
import { validateAuthenticationToken } from "../helpers/auth";

export default function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const header = req.headers.authorization
        if (!header)
            throw new UnauthorizedError("User is not logged in")

        const token = header.split(" ")[1]
        const decodedToken: any = validateAuthenticationToken(token)
        const user = decodedToken.user
        res.locals.authUser = user
        next()
    } catch {
        throw new UnauthorizedError("User is not logged in")
    }
}