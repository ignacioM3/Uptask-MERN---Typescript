import { Request , Response} from "express";
import User from "../models/User";
import bcrypt from 'bcrypt'
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { transport } from "../config/nodemailer";
import { AuthEmail } from "../emails/AuthEmail";


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
            const token = new Token();
            token.token = generateToken();
            token.user = user._id;
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })
            await Promise.allSettled([user.save(), token.save()])
            res.send('Cuenta creada, revisa tu email para confirmarla')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }


    static confirmAccount = async(req: Request, res: Response) => {
        try {
            const {token} = req.body;
            const tokenExists = await Token.findOne({token});
            if(!tokenExists){
                const error = new Error('Token no valido')
                return res.status(401).json({error: error.message})
            }
            const user = await User.findById(tokenExists.user)
            user.confirmed = true;
            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            res.send('Cuenta confirmada correctamente')
        } catch (error) {
            res.status(500).json()
        }
    }
}