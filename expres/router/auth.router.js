import { Router } from "express";
import { registr } from "../controller/auth.controller.js";
import authGroph from "../controller/patrulUsers.js";

let authRoute = Router()

authRoute.post(authGroph)
authRoute.post('/', registr)

export default authRoute