
import path from 'path';
import dotenv from "dotenv"
import * as _ from "lodash"

const configOutput = dotenv.config({ path: path.resolve(__dirname, `./.${process.env.NODE_ENV}.env`)});
if (configOutput.error)
  throw new Error(".env file is missing")

const required_config_variables: any = {//Safe to use any in here!
  SERVER_PORT: process.env.SERVER_PORT,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
}

const optional_config_variables = {
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD
}

function validateConfig() {

  for (let key of Object.keys(required_config_variables)) {
    if (_.isEmpty(required_config_variables[key]))
      throw new Error(`Env key ${key} is missing`)
  }
}

const config = {
  ...required_config_variables,
  ...optional_config_variables,
  validateConfig
}

export { config };