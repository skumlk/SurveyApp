import { Document } from "mongoose";

export default interface IAuthUser extends Document {
    _id: string,
    email: string,
    isAdmin: boolean
}