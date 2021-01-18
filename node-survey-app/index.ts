import dotenv from "dotenv";
import startup from "./startup/index"
const express = require("express")

const result = dotenv.config()
if (result.error) 
  throw result.error

async function startServer() {
    
    const port = process.env.PORT;
    console.log("Starting server...")
    if (!port) { console.log("PORT undefined"); return process.exit(1) }

    const app = express()
    await startup({ expressApp: app });

    app.listen(port, () => {
        console.log("Server Started on port: ", port)
    }).on("error", (err: any) => {
        console.log("am i")
        console.log(err)
    })
}

startServer()