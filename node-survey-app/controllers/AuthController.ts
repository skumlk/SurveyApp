
import "reflect-metadata";
import * as express from "express";
import Container from "typedi";
import AuthService from "../services/AuthService";

function successResponse(res: express.Response){
    return res.send("Success")
}

export default class AuthController {

    static async login(req: express.Request, res: express.Response, next: any) {

        try {
            const { email, password } = req.body;
            const authService = Container.get(AuthService) // Service locator
            await authService.login(email, password)
            return successResponse(res)
        } catch (e) {
            next(e)
        }
    }
}