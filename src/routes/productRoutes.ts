import express from 'express';

import { indexProducts,showTopFive, showProductByCategory , showProductById, createProduct } from '../controllers/productControllers';
import {tokenVerification} from '../middlewares/tokenVerification';

const productRoutes = (app: express.Application) => {
    app.get('/products', indexProducts);
    app.get('/top_five',showTopFive);
    app.get('/product/:product_id', showProductById);
    app.get('/category_products/:category_id', showProductByCategory);
    app.post('/product',tokenVerification, createProduct);
  }
  
  export default productRoutes;