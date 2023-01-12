import supertest from 'supertest';

import {Category, categoriesStore} from '../models/category';
import {app} from '../index';

const request = supertest(app);
const store = new categoriesStore();

describe ("category model", () => {
    it('index method should return a list of categories', async () => {
        const result = await store.index();    
        expect(result).toEqual(
            [ 
                Object(
                    {
                        id: 1,
                        category_name:'kitchen'
                    }),
                Object(
                    {
                        id: 2,
                        category_name:'devices'
                    })
            ]
        );
    });

    it('show method should return the correct category', async () => {
        const result = await store.show(1);    
        expect(result).toEqual(Object(
            {
                id: 1,
                category_name:'kitchen'
            }));
    });

    it('create method should add a category', async () => {
        const theCategory:Category = {
            categoryName:"books",
        }
        const result = await store.create(theCategory);    
        expect(result).toEqual("category created");
    });
});

describe('Category endpoints response test', () => {
    it('/categories should return a list of categories', async () => {
      const response = await request.get('/categories');
      expect(response.body).toEqual(
        [ 
            Object(
                {
                    id: 1,
                    category_name:'kitchen'
                }),
            Object(
                {
                    id: 2,
                    category_name:'devices'
                }),
            Object(
                { 
                    id: 3,
                    category_name: 'books' 
                })
        ]
        );
    });

    it('/category/:id should return the right category', async () => {
        const response = await request.get('/category/1');
        expect(response.body).toEqual(
              Object(
                  {
                      id: 1,
                      category_name:'kitchen'
                  })
          );
      });

      it('/category should return not autherized error', async () => {
        const response = await request.post('/category');
        expect(response.status).toEqual(500);
      });

});
