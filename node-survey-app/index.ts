import { config } from "./config/config"
import startup from "./startup/index"
import express from "express"

const app = express()
async function startServer() {

    console.log("Starting server...")

    try {
        await startup({ expressApp: app });
    } catch (error) {
        console.log(error.message)
        return process.exit(1);
    }

    app.listen(config.SERVER_PORT, () => {
        console.log("Server Started on port: ", config.SERVER_PORT)
    }).on("error", (err: any) => {
        console.log(err)
    })
}

startServer()
export default app