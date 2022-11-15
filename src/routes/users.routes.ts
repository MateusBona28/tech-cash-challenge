import { Router } from "express";
import { createUserController, listUserDetailCashInController, listUserDetailCashOutController, listUserDetailController, listUserDetailOrderedController } from "../controllers/users.controllers";
import { getUserFromTokenMiddleware } from "../middlewares/getUserFromToken.middleware";


const usersRoutes = Router()


usersRoutes.post("", createUserController)
usersRoutes.get("/:id", getUserFromTokenMiddleware, listUserDetailController)
usersRoutes.get("/:id/order/:order", getUserFromTokenMiddleware, listUserDetailOrderedController)
usersRoutes.get("/:id/cash-in", getUserFromTokenMiddleware, listUserDetailCashInController)
usersRoutes.get("/:id/cash-out", getUserFromTokenMiddleware, listUserDetailCashOutController)


export default usersRoutes
