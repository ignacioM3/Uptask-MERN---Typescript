import { Request , Response} from "express";
import User from "../models/User";
import bcrypt from 'bcrypt'


export class AuthController{
    static createAccount = async (req: Request, res: Response) =>{
        try {
            const {password, email} = req.body

            const existUser = await User.findOne({email})
            if(existUser){
                const error = new Error('El usuario ya esta registrado')
                return res.status(409).json({error: error.message})
            }

            const user = new User(req.body)

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save();
            res.send('Cuenta creada, revisa tu email para confirmarla')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}