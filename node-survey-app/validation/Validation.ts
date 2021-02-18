import Joi from "joi";
import ValidationError from "../errors/ValidationError";

export default class Validation {

    validate(schema: Joi.ObjectSchema, data: any, isThrowError = true) {

        const { error } = schema.validate(data);
        if (error)
            if (isThrowError)
                throw new ValidationError(error)
            else
                return error

        return true
    }
}