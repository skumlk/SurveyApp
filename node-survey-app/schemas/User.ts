import mongoose from "mongoose";
import IUser from "../types/IUser"
import * as AuthHelpers from "../helpers/auth";

const UserSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

UserSchema.pre("save", async function (next) {//Use this as prehook, because hasing password before saving is critical!
    this.password = await AuthHelpers.generatePasswordHash(this.password)
    next();
})

const User = mongoose.model<IUser>("User", UserSchema);
export { User };