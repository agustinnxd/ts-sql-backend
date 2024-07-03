import { NextFunction, Request, Response } from "express"

export const esRoleValido = (...roles) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere validar el role sin validar el token primero"
            })
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `Role invalido - Roles: ${roles}`
            })
        }
        next()
    }
}

export const esAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere validar el role sin validar el token primero"
        })
    }

    const { role } = req.usuario;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Se requiere ser admin para consumir este servicio'
        })
    }

    next()
}