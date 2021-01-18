
import expressLoader from './express';
import routesLoader from './routes';
import middlwareLoader from './middlewares';
import express from "express";

export default async ({ expressApp } = { expressApp: express.application }) => {
    await expressLoader({ expressApp })
    console.log("Express initialized")

    await routesLoader({ expressApp })
    console.log("Routes initialized")

    await middlwareLoader({ expressApp })
    console.log("Middlewares initialized")
};
