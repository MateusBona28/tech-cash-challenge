import "reflect-metadata"
import "express-async-errors"
import express from "express"
import usersRoutes from "./routes/users.routes"
import { handleErrorMiddleware } from "./middlewares/errors.middlewares"
import sessionRoutes from "./routes/session.routes"
import transactionsRoutes from "./routes/transaction.routes"
import cors from "cors"


const app = express()
app.use(express.json())


app.use("/users", cors(), usersRoutes)
app.use("/login", cors(), sessionRoutes)
app.use("/transactions", cors(), transactionsRoutes)

app.use(handleErrorMiddleware)


export default app