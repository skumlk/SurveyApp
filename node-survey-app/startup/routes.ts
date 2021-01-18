
import * as express from "express";
import authRoutes from "../routes/AuthRoutes";

export default async ({ expressApp } = { expressApp: express.application }) => {
    expressApp.use("/api/auth", authRoutes)
}