"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var categoryControllers_1 = require("../controllers/categoryControllers");
var tokenVerification_1 = require("../middlewares/tokenVerification");
var categoryRoutes = function (app) {
    app.get('/categories', categoryControllers_1.indexCategories);
    app.get('/category/:id', categoryControllers_1.showCategory);
    app.post('/category', tokenVerification_1.tokenVerification, categoryControllers_1.createCategory);
};
exports.default = categoryRoutes;
