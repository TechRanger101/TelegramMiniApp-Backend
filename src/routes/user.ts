import { Router } from 'express'
import {home, updateCoins, updateLevel} from "../controllers";
import { authenticate } from '../middlewares';
const userRouter = Router();

userRouter.get("/", authenticate, home);
userRouter.post("/updatecoins", authenticate, updateCoins);
userRouter.post("/updatelevel", authenticate, updateLevel);
export default userRouter;