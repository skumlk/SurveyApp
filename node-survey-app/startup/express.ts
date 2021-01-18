
import express from "express";
const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

export default async ({ expressApp } = { expressApp: express.application }) => {
    expressApp.use(cors());
    expressApp.use(require('morgan')('dev'));
    expressApp.use(helmet());

    expressApp.use(express.json({
        limit: '15kb'
    }));

    const limiter = rateLimit({
        max: 150,
        windowMs: 60 * 60 * 1000,
        message: 'Too Many Request from this IP, please try again in an hour'
    });

    expressApp.use('/api', limiter);
    expressApp.use(mongoSanitize());
    expressApp.use(xss());
    expressApp.use(hpp());
}