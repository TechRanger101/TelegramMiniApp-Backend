import { Request, Response} from "express";
import {User} from "../models";
import {generateLootBox} from "../utils";

export const leaderBoard = async(req: Request, res: Response) => {   
  try {  
    const userProfile = await User.find({}).select("_id").select("userId").select("coins").select("friends");  
    res.status(200).send({userProfile});  
  } catch (err) {  
    res.status(404).send(err);
  }
};


// Friends Add, Remove, Request and Declien
export const addFriend = async(req: Request, res: Response) => {
  try{
    await User.findByIdAndUpdate({_id: req.body.user._id},{$push:{friends: req.body.requestedUser},$pull: {candidateFriends: req.body.requestedUser}});
    if(req.body.user.friends.length()%10 === 9){
      const lootBox = generateLootBox(req.body.user.friends.length()%10);
      await User.findByIdAndUpdate({_id: req.body.user._id},{$push:{friends: req.body.requestedUser},$pull: {candidateFriends: req.body.requestedUser},$inc:{coins: lootBox.coins, power: lootBox.power, gpus:lootBox.gpus}});
      res.status(200).send({message: "Success",lootBox});
    }
    await User.findByIdAndUpdate({_id: req.body.user._id},{$push:{friends: req.body.requestedUser},$pull: {candidateFriends: req.body.requestedUser}});
    res.status(200).send({message: "Success"});
  }
  catch (err){
    res.status(404).send(err);
  }
}

export const removeFriend = async(req: Request, res: Response) => {
  try{
    await User.findByIdAndUpdate({_id: req.body.user._id},{$pull:{friends: req.body.requestedUser}});
    res.status(200).send({message: "Success"});
  }
  catch (err){
    res.status(404).send(err);
  }
}

export const requestFriend = async(req: Request, res: Response) => {
  await User.findByIdAndUpdate({_id: req.body.user._id},{$push: {candidateFriends: req.body.requestedUser}});
  res.status(200).send({message: "Success"});
}

export const declineFriend = async(req: Request, res: Response) => {
  await User.findByIdAndUpdate({_id: req.body.user._id},{$pull: {candidateFriends: req.body.requestedUser}});
  res.status(200).send({message: "Success"});
}

export const missionsAchievements = async(req: Request, res: Response) => {
  await User.findByIdAndUpdate({_id: req.body.user._id}, {$inc:{coins: req.body.coins}});
  res.status(200).send({message: "Success"});
}