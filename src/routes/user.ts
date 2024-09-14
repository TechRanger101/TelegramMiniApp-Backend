import { Router } from 'express'
import {home, updateCoins} from "../controllers";
import { authenticate } from '../middlewares';
const userRouter = Router();

userRouter.get("/", authenticate, home);
userRouter.post("/updatecoins", authenticate, updateCoins);
export default userRouter;