import { Router } from "express";
import { loginUserController } from "../controllers/session.controllers";


const sessionRoutes = Router()

sessionRoutes.post("", loginUserController)

export default sessionRoutes
