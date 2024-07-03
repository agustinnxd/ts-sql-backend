import { Router } from "express";
import {check} from "express-validator"

import { login } from "../controllers/auth";

const router = Router();

router.post('/', [
    check('nombre','El nombre es necesario').not().isEmpty(),
    check('email', 'El email es necesario').not().isEmpty(),
    check('email', 'Email iválido').isEmail()
],login)

export default router