import { Service } from "typedi";
import SurveyValidationService from "../validation/SurveyValidationService";
import SurveyModelService from "../models/SurveyModelService";
import IAuthUser from "../interfaces/IAuthUser";

@Service()
export default class SurveyService {

    constructor(private surveyValidationService: SurveyValidationService,
        private surveyModelService: SurveyModelService) { }

    async createSurvey(name: string, authUser: IAuthUser) {
        this.surveyValidationService.createSurvey({ name })  //Validates and throw errors if there is     
        const survey = await this.surveyModelService.create({name, userId: authUser._id})
        return { "id": survey._id };
    }

    async getAllSurveys(){
        const data = await this.surveyModelService.getAll()
        return data
    }

    async getSurvey(id: string){
        this.surveyValidationService.getById({ id })  //Validates and throw errors if there is     
        const data = await this.surveyModelService.getById(id)
        return data
    }

    async getSurveysByUser(authUser: IAuthUser) {
        return await this.surveyModelService.getByUserId(authUser._id)
    }
}