import { Router } from "express";
import { check } from "express-validator";

import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuario";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from '../middlewares/validar-jwt'
import { esRoleValido, esAdmin } from "../middlewares/validar-roles";
import { emailExiste } from "../helpers/db-validators";

const router = Router();

router.get('/', getUsuarios);

router.get('/:id', getUsuario);

router.post('/', [
    validarJWT,
    esRoleValido('USER_ROLE', 'ADMIN_ROLE'),
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('email', 'El email es necesario').not().isEmpty(),
    check('email', 'Email iválido').isEmail(),
    validarCampos
], postUsuario);

router.put('/:id', [
    validarJWT,
    esRoleValido('USER_ROLE', 'ADMIN_ROLE'),
    check('email').custom(emailExiste),
    validarCampos
],putUsuario);

router.delete('/:id', [
    validarJWT,
    esAdmin,
    validarCampos
],deleteUsuario);


export default router;