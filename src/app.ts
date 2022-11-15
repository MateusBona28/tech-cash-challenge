import "reflect-metadata"
import "express-async-errors"
import express from "express"
import usersRoutes from "./routes/users.routes"
import { handleErrorMiddleware } from "./middlewares/errors.middlewares"
import sessionRoutes from "./routes/session.routes"


const app = express()
app.use(express.json())


app.use("/users", usersRoutes)
app.use("/login", sessionRoutes)

app.use(handleErrorMiddleware)


export default app