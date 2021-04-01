import "reflect-metadata";
import * as express from "express";
import Container from "typedi";
import SurveyService from "../services/SurveyService";
import * as httpHelpers from "../helpers/http";
import NotFoundError from "../errors/NotFoundError";

export default class SurveyController {

    static async createSurvey(req: express.Request, res: express.Response, next: express.NextFunction) {

        try {
            const { title, description } = req.body;
            const authUser = res.locals.authUser;
            const surveyService = Container.get(SurveyService) // Service locator
            const data = await surveyService.createSurvey(title, description, authUser)
            return httpHelpers.successResponse(res, data)
        } catch (e) {
            next(e)
        }
    }

    static async viewMySurveys(req: express.Request, res: express.Response, next: express.NextFunction) {

        try {
            const authUser = res.locals.authUser;
            const surveyService = Container.get(SurveyService) // Service locator
            const data = await surveyService.getSurveysByUser(authUser)
            return httpHelpers.successResponse(res, data)
        } catch (e) {
            next(e)
        }
    }

    static async viewSurvey(req: express.Request, res: express.Response, next: express.NextFunction) {

        try {
            const { id } = req.params as { id: string };
            const surveyService = Container.get(SurveyService) // Service locator
            const data = await surveyService.getSurvey(id)
            if(data === null) throw new NotFoundError("Survey not found")
            return httpHelpers.successResponse(res, data)
        } catch (e) {
            next(e)
        }
    }

    static async viewAllSurveys(req: express.Request, res: express.Response, next: express.NextFunction) {

        try {
            const surveyService = Container.get(SurveyService) // Service locator
            const data = await surveyService.getAllSurveys()
            return httpHelpers.successResponse(res, data)
        } catch (e) {
            next(e)
        }
    }
}