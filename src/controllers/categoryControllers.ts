import { Request, Response, NextFunction } from 'express';

import { Category, categoriesStore } from '../models/category';

export const indexCategories =async function(req:Request, res:Response,next:NextFunction) {
    try{
        const store = new categoriesStore();
        const result = await store.index();
        res.json(result);
    } catch(err){
        next(err);
    }
}


export const showCategory =async function(req:Request, res:Response,next:NextFunction) {
    try{
        const categoryId:string = req.params.id;
        const store = new categoriesStore();
        const result = await store.show(parseInt(categoryId));
        res.json(result);
    } catch(err){
        next(err);
    }
}

export const createCategory =async function(req:Request, res:Response,next:NextFunction) {
    try{
        const theCategory:Category = req.body;
        const store = new categoriesStore();
        const result = await store.create(theCategory);
        res.json(result);
    } catch(err){
        next(err);
    }
}
