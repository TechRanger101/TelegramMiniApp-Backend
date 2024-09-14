import { Request, Response} from "express";
import {User, Task, Job, Agent} from "../models";

export const home = async(req: Request, res: Response) => {
    const user= await User.findOne({_id: req.body.user._id});
    const tasks = await Task.find({});
    const jobs = await Job.find({});
    const agents = await Agent.find({_id: {$in: req.body.user.agents}});
    console.log();
    res.status(200).send({user, tasks, jobs, agents});
};

export const updateCoins = async(req: Request,res: Response)=> {
    const createdAt = req.body.user.created_at;
    const currentDateTime = new Date();
    const accountAgeInDays = Math.floor((currentDateTime.getTime() - createdAt.getTime())/(1000*60*60*24));
    if(accountAgeInDays<30 && req.body.user.referralUser){
        await User.findByIdAndUpdate({_id: req.body.user.referralUser},{$inc:{referralIncome: Math.floor(req.body.coins/20)}});
    }
    await User.findByIdAndUpdate({_id: req.body.user._id}, {coins: req.body.coins,levelRate: req.body.levelRate, gpus: req.body.gpus, 
        data: req.body.data,energy: req.body.energy, power: req.body.power, passiveIncome: req.body.passiveIncome, level: req.body.level
    }
    );

    res.status(200).send({message: "Success Increase Coin",referralIncome:req.body.user.referralIncome});
}