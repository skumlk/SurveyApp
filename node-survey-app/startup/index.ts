
import expressLoader from './express';
import routesLoader from './routes';
import middlwareLoader from './middlewares';
import configLoader from './config';
import mongoLoader from "./mongodb";
import express from "express";

export default async ({ expressApp } = { expressApp: express.application }) => {
    
    await configLoader({ expressApp })//This should come first!
    console.log("Config initialized")
    
    await expressLoader({ expressApp })
    console.log("Express initialized")

    await routesLoader({ expressApp })
    console.log("Routes initialized")

    await mongoLoader()
    console.log("Mongo DB initialized")

    await middlwareLoader({ expressApp })
    console.log("Middlewares initialized")
};
