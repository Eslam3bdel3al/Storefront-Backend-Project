"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerification = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var tokenVerification = function (req, res, next) {
    try {
        var theHeader = req.headers.authorization;
        var token = theHeader === null || theHeader === void 0 ? void 0 : theHeader.split(' ')[1];
        var decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.theToken = decodedToken;
        next();
    }
    catch (err) {
        next(new Error("you not autherized"));
    }
};
exports.tokenVerification = tokenVerification;
