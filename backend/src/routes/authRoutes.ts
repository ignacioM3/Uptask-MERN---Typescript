import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErros } from "../middleware/validation";

const router = Router();

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres'),
    body('password_confirmation').custom((value, {req}) =>{
        if(value !== req.body.password){
            throw new Error('Los Password no son iguales')
        }
        return true
    } ),
    body('email')
        .isEmail().withMessage('Email no valido'),
    handleInputErros,
    AuthController.createAccount)

export default router