"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userControllers_1 = require("../controllers/userControllers");
var tokenVerification_1 = require("../middlewares/tokenVerification");
var userRoutes = function (app) {
    app.get('/users', tokenVerification_1.tokenVerification, userControllers_1.index);
    app.get('/profile', tokenVerification_1.tokenVerification, userControllers_1.show);
    app.post('/user', userControllers_1.createUser);
    app.post('/login', userControllers_1.loginUser);
};
exports.default = userRoutes;
