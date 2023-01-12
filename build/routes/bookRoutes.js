"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bookControllers_1 = require("../controllers/bookControllers");
var tokenVerification_1 = require("../middlewares/tokenVerification");
var bookRoutes = function (app) {
    app.get('/books', tokenVerification_1.tokenVerification, bookControllers_1.index);
    app.post('/book', bookControllers_1.createBook);
    app.delete('/book/:id', bookControllers_1.deleteBook);
};
exports.default = bookRoutes;
