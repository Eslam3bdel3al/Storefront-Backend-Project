import { Request, Response, NextFunction } from 'express';

import { Product, productStore } from '../models/product';
import {orderProductsJoinsRep} from '../sevices/orderProducts';

export const indexProducts  = async function (req:Request, res:Response,next:NextFunction){
    try{
        const store = new productStore();
        const result = await store.index();
        res.json(result);
    } catch(err){
        next(err);
    }
}

export const showProductById = async function (req:Request, res:Response,next:NextFunction) {
    try {
        const product_id:string = req.params.product_id;

        const store = new productStore();
        const result = await store.show(parseInt(product_id));
        res.json(result);
    }catch(err){
        next(err);
    }
}

export const showTopFive = async function (req:Request, res:Response,next:NextFunction) {
    try {
        const rep = new orderProductsJoinsRep();
        const result = await rep.indexTopfive();
        console.log(result);
        res.json(result);
    }catch(err){
        next(err);
    }
}

export const showProductByCategory = async function (req:Request, res:Response,next:NextFunction) {
    try {
        const category_id:string = req.params.category_id;

        const store = new productStore();
        const result = await store.showByCategory(parseInt(category_id));
        res.json(result);
    }catch(err){
        next(err);
    }
}

export const createProduct = async function (req:Request, res:Response,next:NextFunction) {
    try{
        const theProduct:Product = req.body;

        const store = new productStore();
        const result = await store.create(theProduct);
        res.json(result)
    }catch(err){
        next(err);
    }
}