import express from 'express';

import { indexCategories, showCategory, createCategory } from '../controllers/categoryControllers';
import {tokenVerification} from '../middlewares/tokenVerification';

const categoryRoutes = (app: express.Application) => {
    app.get('/categories', indexCategories);
    app.get('/category/:id', showCategory);
    app.post('/category', tokenVerification, createCategory);
  }
  
export default categoryRoutes;