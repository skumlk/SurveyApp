
import "reflect-metadata";
import * as express from "express";
import Container from "typedi";
import AuthService from "../services/AuthService";
import * as httpHelpers from "../helpers/http";

export default class AuthController {

    static async login(req: express.Request, res: express.Response, next: express.NextFunction) {

        try {
            const { email, password } = req.body;
            const authService = Container.get(AuthService) // Service locator
            const data = await authService.login(email, password)
            return httpHelpers.successResponse(res, data)
        } catch (e) {
            next(e)
        }
    }

    static async register(req: express.Request, res: express.Response, next: express.NextFunction){

        try {
            const { name, email, password } = req.body;
            const authService = Container.get(AuthService) // Service locator
            const data = await authService.register(name, email, password)
            return httpHelpers.successResponse(res, data)
        } catch (e) {
            next(e)
        }
    }
}