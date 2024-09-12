import { Request, Response} from "express";
import {User} from "../models";

export const home = async(req: Request, res: Response) => {
    const user= await User.findOne({_id: req.body.user._id});
    res.status(200).json(user);
};

export const updateCoins = async(req: Request,res: Response)=> {
    const createdAt = req.body.user.created_at;
    const currentDateTime = new Date();
    const accountAgeInDays = Math.floor((currentDateTime.getTime() - createdAt.getTime())/(1000*60*60*24));
    if(accountAgeInDays<30 && req.body.user.referralUser){
        await User.findByIdAndUpdate({_id: req.body.user.referralUser},{$inc:{referralIncome: Math.floor(req.body.coins/20)}});
    }
    await User.findByIdAndUpdate({_id: req.body.user._id}, {$inc:{coins: req.body.coins + req.body.user.referralIncome},$set:{levelRate: req.body.levelRate}});
    res.status(200).send({message: "Success Increase Coin",referralIncome:req.body.user.referralIncome });
}

export const updateLevel = async(req: Request,res: Response)=> {
    await User.findByIdAndUpdate({_id: req.body.user._id},{$inc: {level: 1}});
    res.status(200).send({message: "Succsss Clicks"});
}