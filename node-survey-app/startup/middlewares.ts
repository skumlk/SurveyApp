
import * as express from "express";
import errorMiddleware from "../middlwares/error";

export default async ({ expressApp } = { expressApp: express.application }) => {
    expressApp.use(errorMiddleware)
}