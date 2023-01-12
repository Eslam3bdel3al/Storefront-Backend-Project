import { Request, Response, NextFunction} from 'express';
import jwt,{Secret, JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const tokenVerification = (req:Request, res:Response, next:NextFunction) => {
    try{
        const theHeader = req.headers.authorization;
        const token = theHeader?.split(' ')[1];
        const decodedToken= jwt.verify(token as string, process.env.TOKEN_SECRET as Secret);
        (req as JwtPayload).theToken = decodedToken;
        next();
    }catch(err){
        next(new Error("you not autherized"));
    }
}