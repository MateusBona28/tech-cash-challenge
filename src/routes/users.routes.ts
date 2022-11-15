import { Router } from "express";
import { testRoute } from "../controllers/users.controllers";


const usersRoutes = Router()


usersRoutes.get("", testRoute)


export default usersRoutes
