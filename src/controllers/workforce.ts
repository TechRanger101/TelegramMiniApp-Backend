import { Request, Response} from "express";
import {User, Job, Agent} from "../models";

export const assignJob = async(req: Request, res: Response)=>{
    await Agent.findOneAndUpdate({agentId: req.body.agentId},{assignTo: req.body.jobId,task:req.body.job.title,$inc:{passiveIncome:req.body.job.passiveIncome}});
    await Job.findByIdAndUpdate({_id: req.body.jobId},{assignTo: req.body.agentId});
    res.status(200).send({message: "Success"});
}

export const unassignJob = async(req: Request, res: Response)=>{
    await Agent.findOneAndUpdate({agentId: req.body.agentId},{assignTo: ""});
    await Job.findByIdAndUpdate({_id: req.body.jobId},{assignTo: ""});
    res.status(200).send({message: "Success"});
}

export const assignAgent = async(req: Request, res: Response)=>{
    await Job.findByIdAndUpdate({_id: req.body.jobId},{assignTo: req.body.agentId});
    await Agent.findOneAndUpdate({agentId: req.body.agentId},{assignTo: req.body.jobId,task:"",$inc:{passiveIncome:-req.body.job.passiveIncome}});
    res.status(200).send({message: "Success"});
}

// export const buyGpu = async(req: Request, res: Response)=>{
//     if( req.body.user.coins>= 1000){
//         req.body.coins = -1000*req.body.addGpu;
//         await User.findByIdAndUpdate({_id: req.body.user._id},{$inc: {gpus: req.body.addGpu,coins: -1000*req.body.addGpu}});
//         res.status(200).send({message: "Success"});
//     }
//     else{
//         res.status(400).send({message: "Not Possible"});
//     }
// }

// export const buyData = async(req: Request, res: Response)=>{
//     if( req.body.user.coins>= 500){
//         await User.findByIdAndUpdate({_id: req.body.user._id},{$inc: {datas: req.body.addData,coins: -500*req.body.addData}});
//         res.status(200).send({message: "Success"});
//     }
//     else{
//         res.status(400).send({message: "Not Possible"});
//     }
// }