"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_1 = require("../controllers/usuario");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_roles_1 = require("../middlewares/validar-roles");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', usuario_1.getUsuarios);
router.get('/:id', usuario_1.getUsuario);
router.post('/', [
    validar_jwt_1.default,
    (0, validar_roles_1.esRoleValido)('USER_ROLE', 'ADMIN_ROLE'),
    (0, express_validator_1.check)('nombre', 'El nombre es necesario').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es necesario').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email iválido').isEmail(),
    validar_campos_1.default
], usuario_1.postUsuario);
router.put('/:id', [
    validar_jwt_1.default,
    (0, validar_roles_1.esRoleValido)('USER_ROLE', 'ADMIN_ROLE'),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailExiste),
    validar_campos_1.default
], usuario_1.putUsuario);
router.delete('/:id', [
    validar_jwt_1.default,
    validar_roles_1.esAdmin,
    validar_campos_1.default
], usuario_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map