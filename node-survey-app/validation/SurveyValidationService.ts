import Validation from "./Validation";
const Joi = require('joi-oid')
import { Service } from "typedi";

@Service()
export default class SurveyValidationService extends Validation {

    createSurvey(data: { title: string, description: string }, isThrowError = true) {

        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()
        })

        return this.validate(schema, data, isThrowError)
    }

    getById(data: { id: string }, isThrowError = true) {

        const schema = Joi.object({
            id: Joi.objectId().required()
        })

        return this.validate(schema, data, isThrowError)
    }
}