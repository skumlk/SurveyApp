
import * as express from "express";
import authRoutes from "../routes/AuthRoutes";
import surveyRoutes from "../routes/SurveyRoutes";

export default async ({ expressApp } = { expressApp: express.application }) => {
    expressApp.use("/api/auth", authRoutes)
    expressApp.use("/api/survey", surveyRoutes)
}