
import { Service } from "typedi";
import { User } from "../schemas/User";

@Service()
export default class UserModelService {

    async createNewUser(data: { email: string, name: string, password: string }) {
        const user = new User(data);
        await user.save();
        return user
    }

    async getUserByEmail(email: string) {
        return await User.findOne({ email });
    }

}