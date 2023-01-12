import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import {JwtPayload} from 'jsonwebtoken';

import { User, LoginUser, UserRepo } from '../models/user';

dotenv.config();

export const index = async function (req: Request, res: Response, next:NextFunction) {
    try{
        const repo = new UserRepo();
        const result = await repo.indexUsers()
        res.json(result);
    }catch(err){
        next(err);
    }
}

export const show = async function (req: Request, res: Response, next:NextFunction) {
    try{
        const userId:number = (req as JwtPayload).theToken.userId;
        const repo = new UserRepo();
        const result = await repo.showUsers(userId);
        res.json(result);
    }catch(err){
        next(err);
    }
}

export const createUser = async function (req: Request, res:Response, next:NextFunction){
    try{
        const newUser:User = req.body;
        
        const Repo = new UserRepo();
        const response = await Repo.createUser(newUser);

        res.json(response);
    }catch(err){
        next(err);
    }
}


export const loginUser = async function (req: Request, res:Response, next:NextFunction){
    try{
        const theUser:LoginUser = req.body;
    
            const Repo = new UserRepo();
            const response = await Repo.loginUser(theUser);
            res.json(response);
    }catch(err){
        next(err);
    }
}