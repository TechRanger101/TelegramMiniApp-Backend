import { Router } from 'express'
import {earnBoard, processBalance} from "../controllers";
import {authenticate} from "../middlewares";
const earnRouter = Router();

earnRouter.get("/earnboard", authenticate, earnBoard);
earnRouter.post("/getreward",authenticate,processBalance);
export default earnRouter;