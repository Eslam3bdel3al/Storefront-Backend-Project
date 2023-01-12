import supertest from 'supertest';

import {Product, productStore} from '../models/product';
import {app} from '../index';

const request = supertest(app);
const store = new productStore();

describe ("product model", () => {
    it('index method should return a list of products', async () => {
        const result = await store.index();    
        expect(result).toEqual([ Object(
            {
                id: 1,
                product_name: 'mobile',
                product_price: 7000,
                category_id: '2'
            }) 
        ]);
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(1);    
        expect(result).toEqual(Object(
            {
                id: 1,
                product_name: 'mobile',
                product_price: 7000,
                category_id: '2' 
            }));
    });

    it('showByCategory method should return the correct products', async () => {
        const result = await store.showByCategory(2);    
        expect(result).toEqual([Object(
            {
                id: 1,
                product_name: 'mobile',
                product_price: 7000,
                category_id: '2' 
            })]);
    });

    it('create method should add a product', async () => {
        const theProduct:Product = {
          productName:"7lla",
          productPrice:100,
          categoryId:1
        }
        const result = await store.create(theProduct);    
        expect(result).toEqual("product created");
    });
});


describe('Product endpoints response test', () => {
    it('/products shoud return a list of products', async () => {
      const response = await request.get('/products');
      expect(response.body).toEqual([ Object(
        {
            id: 1,
            product_name: 'mobile',
            product_price: 7000,
            category_id: '2'
        }),Object({
            id: 2,
            product_name: '7lla',
            product_price: 100,
            category_id: '1' })
        ]);
    });

    it('/top_five shoud return the top most popular products', async () => {
        const response = await request.get('/top_five');
        expect(response.body).toEqual([Object({ product_name: 'mobile', ordered_count: '2' })]);
    });

    it('/product/:product_id shoud return the correct product', async () => {
        const response = await request.get('/product/1');
        expect(response.body).toEqual(Object(
            {
                id: 1,
                product_name: 'mobile',
                product_price: 7000,
                category_id: '2'
            }));
    });

    it('/category_products/:category_id shoud return products of the specified category', async () => {
        const response = await request.get('/category_products/2');
        expect(response.body).toEqual([Object(
            {
                "id": 1,
                "product_name": "mobile",
                "product_price": 7000,
                "category_id": "2"
            }
        )]);
    });

    it('/product shoud return not autherized error', async () => {
        const response = await request.post('/product');
        expect(response.status).toEqual(500);
    });
});