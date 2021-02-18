
import { Service } from "typedi";
import { Survey } from "../schemas/Survey";

@Service()
export default class SurveyModelService {

    async create(data: { name: String, userId: string }) {
        const survey = new Survey(data);
        await survey.save();
        return survey
    }

    async getAll() {
        return await Survey.find()
    }

    async getById(id: string) {
        return await Survey.findById(id)
    }

    async getByUserId(userId: string) {
        return await Survey.find({ userId })
    }
}