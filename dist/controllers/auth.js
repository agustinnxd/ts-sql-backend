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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const generar_jwt_1 = __importDefault(require("../helpers/generar-jwt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Verificar si el email existe
        const usuario = yield usuario_1.default.findOne({ where: { email: email } });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - email'
            });
        }
        //Validar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - usuario inactivo'
            });
        }
        //Validar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - contraseña invalida'
            });
        }
        //generar jwt
        const token = yield (0, generar_jwt_1.default)(usuario.password);
        res.json({
            msg: 'Login',
            token
        });
    }
    catch (error) {
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map