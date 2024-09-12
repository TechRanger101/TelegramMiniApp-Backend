import {User} from "../models"
import { Request, Response } from "express"
import { generateToken, generateRefferalCode, generateDailyMisions } from "../utils"

export const signin = async(req: Request, res: Response) => {
    try{
        res.status(200).send({token: generateToken(req.body.user.userId)});
    }
    catch(err){
        res.status(404).send(err)
    }
};

export const signup = async(req: Request, res: Response) => {
    try{
        if(req.body.referralCode){
            const referralUser = await User.findOne({referralCode: req.body.referralCode});
            if(referralUser){
                const user = new User({userId: req.body.userId, userName: req.body.username, coins: 100, refferalCode: generateRefferalCode(), referrals: referralUser._id});
                await user.save();
                await User.updateOne({_id: referralUser._id},{$inc: {coins: 500}});
                console.log("User Who referraled", referralUser._id);
                res.status(200).send({token: generateToken(req.body.userId)});
            }
            else{
                console.log("Common Case");
                const user = new User({userId: req.body.userId,userName: req.body.username, coins: 100, refferalCode: generateRefferalCode()});
                await user.save();
                res.status(200).send({token: generateToken(req.body.userId)});
            }
        }
        else{
            console.log("Common Case");
            const user = new User({userId: req.body.userId,userName: req.body.userName, coins: 100, refferalCode: generateRefferalCode()});
            await user.save();
            res.status(200).send({token: generateToken(req.body.userId)});
        }
    }
    catch(err){
        res.status(404).send(err);
    }
};