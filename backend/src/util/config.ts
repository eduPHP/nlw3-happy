import { resolve, join } from "path"
import { config } from "dotenv"

config({ path: resolve(join(__dirname, ".."/*src*/, ".." /*backend*/, ".env")) })

export const app = {
    port: process.env.SERVER_PORT,
    key: process.env.APP_KEY || ''
}

export default {
    app
}
