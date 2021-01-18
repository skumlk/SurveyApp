import { Service } from "typedi";
import AuthValidationService from "../validation/AuthValidationService";

@Service()
export default class AuthService {

    constructor(private authValidationService: AuthValidationService) {}

    async login(email: string, password: string) {
        this.authValidationService.login(email, password)  //Validates and throw and error if there is     
    }
}