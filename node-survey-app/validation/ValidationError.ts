
import Joi from "joi"

export default class ValidationError {

    public readonly message: string;

    constructor(error: Joi.ValidationError){
        this.message = error.message;
    }

    getCode(){

    }
}