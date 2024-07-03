import { DataTypes, Model, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

import sequelize from '../db/connection';

interface UsuarioModel extends Model<InferAttributes<UsuarioModel>, InferCreationAttributes<UsuarioModel>> {
    nombre: string;
    email: string;
    estado: boolean;
    password: string;
    role: string;
}

const Usuario = sequelize.define<UsuarioModel>('Usuario',{
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    }
});

export default Usuario;

