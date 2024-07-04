import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario";

const validarJWT = async (req: Request , res: Response, next: NextFunction) => {

    const token = req.header('x-token')

    //Validar si se recibió el token
    if (!token) {
        res.status(400).json({
            msg: 'No se envió el token en la petición'
        })
    }

    try {
        const { password } = jwt.verify(token, "Stack") as {password: string};

        const usuario = await Usuario.findOne({ where: { password: password } })

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token invalido - usuario no existe'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token invalido - usuario estado en false'
            })
        }

        req.usuario = usuario;
        

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token invalido'
        })
    }



}

export default validarJWT