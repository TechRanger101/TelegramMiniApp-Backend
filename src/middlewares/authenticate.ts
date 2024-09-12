// src/middleware/authenticate.ts  

import { Request, Response, NextFunction } from 'express';  
import jwt, { JwtPayload } from 'jsonwebtoken';  
import {User} from "../models";

const secretKey = process.env.JWT_SECRET || 'your-secret-key';  

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {  
  try {  
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN_STRING"  
    if (!token) {  
      return res.status(401).send({ message: "NoToken"});
    }  
    try{
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
      req.body.user = await User.findOne({userId: decoded.userId});
      next();
    }
    catch (err) {  
      if (err instanceof jwt.TokenExpiredError) {
        res.status(404).send({message: "Token Expired"});
      } else if (err instanceof jwt.JsonWebTokenError) {
        res.status(404).send({message: "Invalid Token"});  
      } else {
        res.status(404).send(err);
      }  
    }
  } catch (err) {  
    res.status(404).send(err);  
  }  
};