import Validation from "./Validation";
import Joi from "joi";
import { Service } from "typedi";

@Service()
export default class AuthValidationService extends Validation {

    login(email: string, password: string, isThrowError = true) {
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().max(255).min(6)
        })

        return this.validate(schema, { email, password }, isThrowError)
    }
}