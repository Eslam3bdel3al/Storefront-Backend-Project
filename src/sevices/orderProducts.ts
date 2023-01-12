import { client } from "../database";

export class orderProductsJoinsRep {
    async indexTopfive():Promise<{product_name:string, ordered_count:number}[]>{
        try{
        const con = await client.connect();
        const sql = 'SELECT product_name, count(product_name) as ordered_count FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY product_name ORDER BY ordered_count DESC LIMIT 5';
        const result = await con.query(sql) 
        con.release();
        return result.rows;
        } catch(err){
            throw new Error(`Could not get the products. Error: ${err}`);
        }
    }
}