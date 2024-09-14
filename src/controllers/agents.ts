import { Request, Response} from "express";
import {User, Agent} from "../models";

export const agentsList = async(req: Request, res: Response) => {
    try{
        const agents = await Agent.find({_id: {$in: req.body.user.agents}});
        res.status(200).send(agents);
    }
    catch(err){
        console.log(err);
        res.status(404).send(err);
    }
};

export const agentCreate = async(req: Request, res: Response) => {
    try{
        if(req.body.user.coins > 100){
            const agent= new Agent(req.body.newAgent);
            await agent.save();
            await User.findByIdAndUpdate({_id: req.body.user._id},{$push: {agents: agent._id},$inc: {passiveIncome: 1,coins: -100}});
            res.status(200).send({message: "Success Created!!!"});
        }
        else {
            res.status(400).send({message: "Not Possible"});
        }
    }
    catch(err){
        res.status(404).send(err);
    }
}

export const agentsPair = async(req: Request, res: Response)=>{
    try{
        const agent= new Agent(req.body.newAgent);
        await User.findByIdAndUpdate({_id: req.body.user._id},{$pull: {agents: req.body.deleteAgents},$push: {agents: agent._id}});
        await Agent.deleteMany({_id: req.body.deleteAgents});
        res.status(200).send({message: "Successfully Paired."});
    }
    catch(err){
        res.status(404).send(err);
    }
}

export const agentUpgrade = async(req: Request, res: Response)=>{
    try{
        await Agent.findByIdAndUpdate({_id: req.body.agent},
            {
                agentName: req.body.agentName,
                levels: req.body.data.level,
                passiveIncome:req.body.data.passiveIncome,
                strength: req.body.data.strength, 
                agility: req.body.data.agility,
                survivability: req.body.data.survivability,
                healthPoint: req.body.data.healthPoint
            });
            await User.findByIdAndUpdate({_id: req.body.user_id},{$inc: {coins: -req.body.data.coins}});
        res.status(200).send({message: "Success"});
    }
    catch(err){
        res.status(404).send(err);
    }
}