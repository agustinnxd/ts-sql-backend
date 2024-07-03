import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import Usuario from "../models/usuario";


export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({ usuarios })
}

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id)

    if (!usuario) {
        return res.status(400).json({
            msg: `El usuario con el id ${id} no existe`
        })
    }

    res.json({
        usuario
    })
}

export const postUsuario = async (req: Request, res: Response) => {

    const { nombre, email, password, role } = req.body;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: email
            }
        })
        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${email}`
            })
        }

        const usuario = await Usuario.create({ nombre, email, password, role });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
}

export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { estado, password, ...resto } = req.body;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `El usuario con el id ${id} no existe`
            });
        };

        if (password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        await usuario.update(resto);

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: `El usuario con el id ${id} no existe`
        });
    };

    await usuario.update({ estado: 0 });

    res.json(usuario);
}


