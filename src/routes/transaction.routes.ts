import { Router } from "express";
import { createTransactionController } from "../controllers/transactions.controllers";
import { getUserFromTokenMiddleware } from "../middlewares/getUserFromToken.middleware";


const transactionsRoutes = Router()

transactionsRoutes.post("", getUserFromTokenMiddleware, createTransactionController)

export default transactionsRoutes
