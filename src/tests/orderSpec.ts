import supertest from 'supertest';

import {status, Order, orderRep} from '../models/order';
import {app} from '../index';

const request = supertest(app);
const rep = new orderRep();

describe ("order model", () => {
    it('indexUsersOrder method should return the active order', async () => {
        const result = await rep.indexUsersOrder(1);
        expect(result).toEqual('you haven\'t an active order yet');
    });

    it('indexUsersCompletedOrders method should return all the users completed orders', async () => {
        const result = await rep.indexUsersCompletedOrders(1); 
        expect(result).toEqual([]);
    });

    it('create method should create an order', async () => {
        const result = await rep.create(1,1,5);
        expect(result).toEqual("order created");
    });

    it('addProduct method should add a product to the order', async () => {
        const result = await rep.addProduct(1,1,5);
        expect(result).toEqual("product added");
    });
});

describe('Order endpoints response test', () => {
    it('/active_order shoud return not autherized error', async () => {
      const response = await request.get('/active_order');
      expect(response.status).toEqual(500);
    });

    it('/completed_orders shoud return not autherized error', async () => {
        const response = await request.get('/completed_orders');
        expect(response.status).toEqual(500);
    });

    it('/order shoud return not autherized error', async () => {
        const response = await request.post('/order');
        expect(response.status).toEqual(500);
    });

    it('/active_order shoud return not autherized error', async () => {
        const response = await request.post('/product_addition');
        expect(response.status).toEqual(500);
    });
});