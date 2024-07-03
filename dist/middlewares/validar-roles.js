"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esAdmin = exports.esRoleValido = void 0;
const esRoleValido = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere validar el role sin validar el token primero"
            });
        }
        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `Role invalido - Roles: ${roles}`
            });
        }
        next();
    };
};
exports.esRoleValido = esRoleValido;
const esAdmin = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere validar el role sin validar el token primero"
        });
    }
    const { role } = req.usuario;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Se requiere ser admin para consumir este servicio'
        });
    }
    next();
};
exports.esAdmin = esAdmin;
//# sourceMappingURL=validar-roles.js.map