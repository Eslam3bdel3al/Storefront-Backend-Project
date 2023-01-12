import express from 'express';

import { indexUsersOrder,indexUsersCompletedOrders, createOrder, addProduct } from '../controllers/ordercontrollers';
import {tokenVerification} from '../middlewares/tokenVerification';

const orderRoutes = (app: express.Application) => {
    app.get('/active_order', tokenVerification, indexUsersOrder);    
    app.get('/completed_orders', tokenVerification, indexUsersCompletedOrders);    
    app.post('/order', tokenVerification, createOrder);      
    app.post('/product_addition',tokenVerification, addProduct);    
  }
  
  export default orderRoutes;