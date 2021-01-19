import IUser from "../interfaces/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export function comparePassword(user: IUser, password: string): boolean {
    return bcrypt.compareSync(password, user.password);
};

export function generateAuthenticationToken(user: IUser) {
    return jwt.sign({ _id: user.id, isAdmin: user.isAdmin },
        config.JWT_PRIVATE_KEY
    );
};

export async function generatePasswordHash(password: string){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}