"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (password = '') => {
    return new Promise((resolve, reject) => {
        const payload = { password };
        jsonwebtoken_1.default.sign(payload, "Stack", {
            expiresIn: '8h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
            ;
        });
    });
};
exports.default = generarJWT;
//# sourceMappingURL=generar-jwt.js.map