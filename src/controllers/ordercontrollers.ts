import { Request, Response, NextFunction } from 'express';
import {JwtPayload} from 'jsonwebtoken';

import { Order, orderRep } from '../models/order';

export const indexUsersOrder =async function(req:Request, res:Response,next:NextFunction) {
    try{
        const userId:number = (req as JwtPayload).theToken.userId;
        const Rep = new orderRep();
        const result = await Rep.indexUsersOrder(userId);
        res.json(result);
    } catch(err){
        next(err);
    }
}

export const indexUsersCompletedOrders =async function(req:Request, res:Response,next:NextFunction) {
    try{
        const userId:number = (req as JwtPayload).theToken.userId;
        const Rep = new orderRep();
        const result = await Rep.indexUsersOrder(userId);
        res.json(result);
    } catch(err){
        next(err);
    }
}

export const createOrder = async function(req:Request, res:Response,next:NextFunction) {
    try{
        const userId:number = (req as JwtPayload).theToken.userId;
        const {productId, quentity} = req.body;
        const Rep = new orderRep();
        const result = await Rep.create(userId, parseInt(productId),parseInt(quentity));
        res.json(result);
    } catch(err){
        next(err);
    }
}

export const addProduct = async function(req:Request, res:Response,next:NextFunction) {
    try{
        const {orderId, productId, quentity} = req.body;
        const Rep = new orderRep();
        const result = await Rep.create(parseInt(orderId), parseInt(productId),parseInt(quentity));
        res.json(result);
    } catch(err){
        next(err);
    }
}
    