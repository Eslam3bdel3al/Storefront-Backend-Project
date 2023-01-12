import { client } from "../database";

export type Product = {
    productName:string,
    productPrice:number,
    categoryId:number
}

export class productStore {
    async index():Promise<Product[]>{
        try{
            const con = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch(err){
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async show(id:number):Promise<Product | string>{
        try{
            const con = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=$1';
            const result = await con.query(sql,[id]);
            con.release();
            return result.rows[0] || "product doesn't exist";
        } catch(err){
            throw new Error(`Could not get the product. Error: ${err}`);
        }
    }

    async showByCategory(id:number):Promise<Product[]>{
        try{
            const con = await client.connect();
            const sql = 'SELECT * FROM products WHERE category_id=$1';
            const result = await con.query(sql,[id]);
            con.release();
            return result.rows;
        } catch(err){
            throw new Error(`Could not get the product. Error: ${err}`);
        }
    }

    async create(p:Product):Promise<string>{
        try{
            const con = await client.connect();
            const sql = 'INSERT INTO products (product_name, product_price, category_id) VALUES ($1, $2, $3)';
            const result = await con.query(sql,[p.productName, p.productPrice, p.categoryId]);
            con.release();
            return "product created";
        } catch(err){
            throw new Error(`Could not get the product. Error: ${err}`);
        }
    }
}