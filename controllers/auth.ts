import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'

import Usuario from "../models/usuario";
import generarJWT from '../helpers/generar-jwt'

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        
        //Verificar si el email existe
        const usuario = await Usuario.findOne({where: {email: email}});

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - email'
            })
        }

        //Validar si el usuario está activo

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - usuario inactivo'
            })
        }

        //Validar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - contraseña invalida'
            })
        }
        
        //generar jwt
        const token = await generarJWT(usuario.password)

        res.json({
            msg: 'Login',
            token
        })

    } catch (error) {
        
    }
}