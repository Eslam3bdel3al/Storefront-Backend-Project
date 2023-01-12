"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var productRoutes_1 = __importDefault(require("./routes/productRoutes"));
var orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
var categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
exports.app = (0, express_1.default)();
var PORT = 8080;
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, userRoutes_1.default)(exports.app);
(0, productRoutes_1.default)(exports.app);
(0, orderRoutes_1.default)(exports.app);
(0, categoryRoutes_1.default)(exports.app);
//catch all errors
var errorHandler = function (err, req, res, next) {
    res.status(err.status || 500).send({ message: 'err: ' + err.message });
};
exports.app.use(errorHandler);
exports.app.listen(PORT, function () {
    console.log("Server is running at http://localhost:".concat(PORT));
});
