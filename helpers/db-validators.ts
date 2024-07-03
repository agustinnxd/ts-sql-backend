import Usuario from "../models/usuario";

export const emailExiste = async (email : String = '') => {
    const existeEmail = await Usuario.findOne({
        where: {
            email: email
        }
    })
    if(existeEmail){
        throw new Error(`El nombre ${email} ya existe`);
    }
}