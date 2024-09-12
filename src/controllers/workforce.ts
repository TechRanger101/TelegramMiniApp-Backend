import { Request, Response} from "express";
import {User, Job, Agent} from "../models";

export const agentJobBoard = async(req: Request, res: Response) => {
    const agents = await Agent.find({_id: {$in: req.body.user.agents}});   
    const jobs = await Job.find({assignState: true});
    res.status(200).send({agents,jobs});
};

export const assignJob = async(req: Request, res: Response)=>{
    if(req.body.agent.level >= req.body.job.requiredLevel && req.body.agent.assignState === true && req.body.job.assignState === true && req.body.user.power >= req.body.job.requiredPower && req.body.agent.jobId.length == 0){
        await Agent.findByIdAndUpdate({_id: req.body.agentId},{$push: {jobId: req.body.job._id},assignState: false, $inc:{passiveIncome: req.body.job.passiveIncome}});
        await User.findByIdAndUpdate({_id: req.body.user._id},{$inc:{passiveIncome: req.body.job.passiveIncome,power: -req.body.job.requiredPower}});
        await Job.findByIdAndUpdate({_id: req.body.jobId},{assignState: false});
        res.status(200).send({message: "Success"});
    }
    else{
        res.status(400).send({message: "Not Possible"});
    }
}

export const unassignJob = async(req: Request, res: Response)=>{
    if(req.body.agent.level >= req.body.job.requiredLevel && req.body.agent.assignState === false && req.body.job.assignState === false && req.body.agent.jobId.length == 1){
        await Agent.findByIdAndUpdate({_id: req.body.agentId},{$pull: {jobId: req.body.job._id},assignState: true, $inc:{passiveIncome: -req.body.job.passiveIncome}});
        await User.findByIdAndUpdate({_id: req.body.user._id},{$inc:{passiveIncome: -req.body.job.passiveIncome}});
        await Job.findByIdAndUpdate({_id: req.body.jobId},{assignState: true});
        res.status(200).send({message: "Success"});
    }
    else {
        res.status(400).send({message: "Not Possible"});
    }
}

export const assignAgent = async(req: Request, res: Response)=>{
    if(req.body.agent.level >= req.body.job.requiredLevel && req.body.agent.assignState === true && req.body.job.assignState === true && req.body.user.power >= req.body.job.requiredPower && req.body.agent.jobId.length == 0){
        await Agent.findByIdAndUpdate({_id: req.body.agentId},{$push: {jobId: req.body.job._id},assignState: false, $inc:{passiveIncome: req.body.job.passiveIncome}});
        await User.findByIdAndUpdate({_id: req.body.user._id},{$inc:{passiveIncome: req.body.job.passiveIncome,power: -req.body.job.requiredPower}});
        await Job.findByIdAndUpdate({_id: req.body.jobId},{assignState: false});
        res.status(200).send({message: "Success"});
    }
    else{
        res.status(400).send({message: "Not Possible"});
    }
}

export const buyGpu = async(req: Request, res: Response)=>{
    if( req.body.user.coins>= 1000){
        req.body.coins = -1000*req.body.addGpu;
        await User.findByIdAndUpdate({_id: req.body.user._id},{$inc: {gpus: req.body.addGpu,coins: -1000*req.body.addGpu}});
        res.status(200).send({message: "Success"});
    }
    else{
        res.status(400).send({message: "Not Possible"});
    }
}

export const buyData = async(req: Request, res: Response)=>{
    if( req.body.user.coins>= 500){
        await User.findByIdAndUpdate({_id: req.body.user._id},{$inc: {datas: req.body.addData,coins: -500*req.body.addData}});
        res.status(200).send({message: "Success"});
    }
    else{
        res.status(400).send({message: "Not Possible"});
    }
}