import { Router } from 'express'
import {leaderBoard, addFriend, removeFriend, requestFriend, declineFriend} from "../controllers";
import {authenticate,addFriendValidate, removeFriendValidate, requestFriendValidate, declineFriendValidate} from "../middlewares";
const airdropRouter = Router();

airdropRouter.get("/leaderboard", authenticate, leaderBoard);
airdropRouter.post("/addfriend", authenticate, addFriendValidate, addFriend);
airdropRouter.post("/removefriend", authenticate, removeFriendValidate, removeFriend);
airdropRouter.post("/requestfriend", authenticate, requestFriendValidate, requestFriend);
airdropRouter.post("/addfriend", authenticate, declineFriendValidate, declineFriend);
export default airdropRouter;