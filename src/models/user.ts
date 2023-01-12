import bcrypt from 'bcrypt' ;
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { client } from "../database";

dotenv.config();



export type User = {
    firstName:string,
    lastName:string,
    userName:string,
    password:string
}

export type LoginUser = {
    userName:string,
    password:string
}

export class UserRepo {
    async indexUsers():Promise<User[]>{
        try{
            const con = await client.connect();
            const sql = 'SELECT * FROM users';

            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch(err){
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async showUsers(id:number):Promise<User>{
        try{
            const con = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=$1';

            const result = await con.query(sql, [id]);
            con.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async createUser(u:User):Promise<string>{
        try{
            const con = await client.connect();
            const sql = 'INSERT INTO users (first_name, last_name,user_name, password_digest) VALUES ($1, $2, $3, $4)'

            bcrypt.hash(u.password,parseInt(process.env.SALT_ROUND as string), async (err, result)=> {
                if(err){
                    throw new Error(`Error: ${err}`);
                }
                await con.query(sql,[u.firstName, u.lastName,u.userName, result]);
            })

            con.release();
            return "user created";
        }catch(err){
            throw new Error(`Could not create user. Error: ${err}`);
        }
    }

    async loginUser(u:LoginUser):Promise<string>{
        try{
            const con = await client.connect();
            const sql = 'SELECT id, password_digest FROM users WHERE user_name=$1'

            const result =  await con.query(sql,[u.userName]);

            //check if the user exists
            if(result.rows.length == 0){
                throw new Error(`user not found`);
            }

            //data retrieved from DB request
            const logPass = result.rows[0].password_digest;
            const userId =  result.rows[0].id;

            //check if the password is correct
            if(bcrypt.compareSync(u.password,logPass)){

                //payload with userName and userId
                let token = jwt.sign({username:u.userName,userId},process.env.TOKEN_SECRET as string);
                return token;
            }else {
                throw new Error(`username or pass is wrong`);
            };
        }catch(err){
            throw new Error(`you can't login. Error: ${err}`);
        }
    }
}