"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const addNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const result = yield (0, user_service_1.addUserService)({ name, email });
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: "Error in Adding new user",
        });
    }
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email } = req.query;
        // send alluser if no query
        if (!id && !email) {
            const result = yield (0, user_service_1.getUserService)({});
            res.status(400).json({
                success: true,
                data: result,
            });
        }
        // for single user
        let result;
        if (id) {
            result = (0, user_service_1.getUserService)({ _id: id });
        }
        else if (email) {
            result = yield (0, user_service_1.getUserService)({ email });
        }
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: "Error in getting user",
        });
    }
});
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield (0, user_service_1.getUserService)(query);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: "Error in getting user",
        });
    }
});
exports.default = {
    getUser,
    addNewUser,
};
