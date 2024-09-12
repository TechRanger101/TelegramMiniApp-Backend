import { Request, Response} from "express";
import {User, Task} from "../models";

export const earnBoard = async(req: Request, res: Response) => {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
};

export const processBalance = async(req: Request, res: Response) => {
    await User.findByIdAndUpdate({_id: req.body.user._id},{$inc: {coins: req.body.task.reward[0],power: req.body.task.reward[1]}});
    res.status(200).send({message: "Success"});
}