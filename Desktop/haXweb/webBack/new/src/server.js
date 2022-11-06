import app from "./app.js";
import { PORT } from "./config/keys.js"

app.listen( 3002, () => {
    console.log(`App is running on ${PORT} PORT`)
})