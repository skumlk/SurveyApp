import Validation from "./Validation";
import Joi from "joi";
import { Service } from "typedi";

@Service()
export default class AuthValidationService extends Validation {

    login(data: { email: string, password: string }, isThrowError = true) {
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().max(255).min(6)
        })

        return this.validate(schema, data, isThrowError)
    }


    register(data: { name: string, email: string, password: string }, isThrowError = true) {

        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required().max(255).min(6)
        })

        return this.validate(schema, data, isThrowError)
    }
}