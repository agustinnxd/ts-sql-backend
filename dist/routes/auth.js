"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es necesario').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es necesario').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email iválido').isEmail()
], auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map