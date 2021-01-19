import { Service } from "typedi";
import UnauthorizedError from "../errors/UnauthorizedError";
import AuthValidationService from "../validation/AuthValidationService";
import UserModelService from "../models/UserModelService";
import * as ErrorCodes from "../errors/ErrorCodes"
import * as AuthHelpers from "../helpers/auth";
import BadRequestError from "../errors/BadRequestError";
@Service()
export default class AuthService {

    constructor(private authValidationService: AuthValidationService,
        private userModelService: UserModelService) { }

    async login(email: string, password: string) {

        this.authValidationService.login({ email, password })  //Validates and throw errors if there is     

        const user = await this.userModelService.getUserByEmail(email)
        if (!user) throw new UnauthorizedError(ErrorCodes.INVALID_USERNAME_PASSWORD)

        const isValidPassword = AuthHelpers.comparePassword(user, password);
        if (!isValidPassword) throw new UnauthorizedError(ErrorCodes.INVALID_USERNAME_PASSWORD)

        return { "token": AuthHelpers.generateAuthenticationToken(user) };
    }

    async register(name: string, email: string, password: string) {

        this.authValidationService.register({ name, email, password }) //Validates and throw errors if there is    

        const user = await this.userModelService.getUserByEmail(email)
        if (user !== null) throw new BadRequestError(ErrorCodes.USER_ALREADY_EXIST)
        
        const new_user = await this.userModelService.createNewUser({name, email, password})
        //Send email as an event!

        return { "token": AuthHelpers.generateAuthenticationToken(new_user) };
    }
}