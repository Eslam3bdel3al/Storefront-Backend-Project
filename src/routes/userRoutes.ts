import express  from "express";

import {index, show, createUser, loginUser} from "../controllers/userControllers";
import {tokenVerification} from "../middlewares/tokenVerification"

const userRoutes = (app: express.Application) => {
    app.get('/users',tokenVerification, index);
    app.get('/profile',tokenVerification, show);
    app.post('/user', createUser);
    app.post('/login', loginUser);
  }
  
  export default userRoutes;