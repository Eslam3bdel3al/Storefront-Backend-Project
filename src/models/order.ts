import { client } from "../database";


export enum status {
    "active",
    "complete"
}

export type Order = {
    orderStatus:status;
}

export class orderRep {

    async indexUsersOrder(userId:number):Promise<Order|string>{
        try{
        const con = await client.connect();
        const sql = 'SELECT * FROM orders WHERE user_id =$1 AND order_status = \'active\'';
        const result = await con.query(sql,[userId]) 
        con.release();
        return result.rows[0] || "you haven't an active order yet";
        } catch(err){
            throw new Error(`Could not get the use's orders. Error: ${err}`);
        }
    }

    async indexUsersCompletedOrders(userId:number):Promise<Order[]>{
        try{
        const con = await client.connect();
        const sql = 'SELECT * FROM orders WHERE user_id =$1 AND order_status = \'complete\'';
        const result = await con.query(sql,[userId]) 
        con.release();
        return result.rows;
        } catch(err){
            throw new Error(`Could not get the use's orders. Error: ${err}`);
        }
    }

    async create(userId:number ,productId:number, quantity:number):Promise<string>{
        try{
            const con = await client.connect();
            const sql = 'INSERT INTO orders (user_id, order_status) VALUES ($1,$2) RETURNING id';
            const result = await con.query(sql,[userId,'active']);
            con.release();
            await this.addProduct(result.rows[0].id, productId, quantity);
            return "order created";
        } catch(err){
            throw new Error(`Could not create the order. Error: ${err}`);
        }
    }

    async addProduct(orderId:number , productId:number, quantity:number):Promise<string>{
        try{
            const con = await client.connect();
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)';
            await con.query(sql,[orderId, productId, quantity]);
            con.release();
            return "product added";
        }catch(err){
            throw new Error(`Could not add the product. Error: ${err}`);
        }
    }
}