
import "reflect-metadata";
import * as express from "express";
import Container from "typedi";
import AuthService from "../services/AuthService";

function successResponse(res: express.Response, data: any = null){
    return res.send({success: true, data})
}

export default class AuthController {

    static async login(req: express.Request, res: express.Response, next: express.NextFunction) {

        try {
            const { email, password } = req.body;
            const authService = Container.get(AuthService) // Service locator
            const data = await authService.login(email, password)
            return successResponse(res, data)
        } catch (e) {
            next(e)
        }
    }

    static async register(req: express.Request, res: express.Response, next: express.NextFunction){

        try {
            const { name, email, password } = req.body;
            const authService = Container.get(AuthService) // Service locator
            const data = await authService.register(name, email, password)
            return successResponse(res, data)
        } catch (e) {
            next(e)
        }
    }
}