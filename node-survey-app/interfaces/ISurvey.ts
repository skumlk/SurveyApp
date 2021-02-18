import { Document } from "mongoose";

export default interface ISurvey extends Document {
    email: string,
    password: string,
    isAdmin: boolean
}