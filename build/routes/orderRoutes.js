"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ordercontrollers_1 = require("../controllers/ordercontrollers");
var tokenVerification_1 = require("../middlewares/tokenVerification");
var orderRoutes = function (app) {
    app.get('/active_order', tokenVerification_1.tokenVerification, ordercontrollers_1.indexUsersOrder);
    app.get('/completed_orders', tokenVerification_1.tokenVerification, ordercontrollers_1.indexUsersCompletedOrders);
    app.post('/order', tokenVerification_1.tokenVerification, ordercontrollers_1.createOrder);
    app.post('/product_addition', tokenVerification_1.tokenVerification, ordercontrollers_1.addProduct);
};
exports.default = orderRoutes;
