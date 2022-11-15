import { Router } from "express";
import { createUserController, testRoute } from "../controllers/users.controllers";


const usersRoutes = Router()


usersRoutes.get("", testRoute)
usersRoutes.post("", createUserController)


export default usersRoutes
