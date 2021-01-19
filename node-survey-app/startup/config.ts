
import { config } from "../config/config"
const { validateConfig } = config

export default async ({ } = {}) => {
    validateConfig()
}