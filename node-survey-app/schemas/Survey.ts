import mongoose from "mongoose";
import ISurvey from "../interfaces/ISurvey";

const SurveySchema = new mongoose.Schema<ISurvey>({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Survey = mongoose.model<ISurvey>("Survey", SurveySchema);
export { Survey };