import { client } from "../database";

export type Category = {
    categoryName:string;
}

export class categoriesStore {
    async create(c:Category):Promise<string>{
        try{
            const con = await client.connect();
            const sql = 'INSERT INTO categories (category_name) VALUES ($1);';
            await con.query(sql,[c.categoryName]);
            con.release();
            return "category created";
        } catch(err){
            throw new Error(`Could not create the category. Error: ${err}`);
        }
    }

    async index():Promise<Category[]>{
        try{
        const con = await client.connect();
        const sql = 'SELECT * FROM categories';
        const result = await con.query(sql) 
        con.release();
        return result.rows;
        } catch(err){
            throw new Error(`Could not get the categories. Error: ${err}`);
        }
    }

    async show(id:number):Promise<Category|string>{
        try{
        const con = await client.connect();
        const sql = 'SELECT * FROM categories WHERE id=$1';
        const result = await con.query(sql,[id]) 
        con.release();
        return result.rows[0] || "category doesn't exist";
        } catch(err){
            throw new Error(`Could not get the category. Error: ${err}`);
        }
    }

}