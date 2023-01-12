"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productControllers_1 = require("../controllers/productControllers");
var tokenVerification_1 = require("../middlewares/tokenVerification");
var productRoutes = function (app) {
    app.get('/products', productControllers_1.indexProducts);
    app.get('/top_five', productControllers_1.showTopFive);
    app.get('/product/:product_id', productControllers_1.showProductById);
    app.get('/category_products/:category_id', productControllers_1.showProductByCategory);
    app.post('/product', tokenVerification_1.tokenVerification, productControllers_1.createProduct);
};
exports.default = productRoutes;
