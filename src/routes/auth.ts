import { Router } from 'express'
import {signinController} from "../controllers";
import {signupController} from "../controllers";
import {loginValidate, signUpValidate} from "../middlewares";
const auth = Router();

auth.post("/signin", loginValidate, signinController);
auth.post("/signup", signUpValidate, signupController);
export default auth;