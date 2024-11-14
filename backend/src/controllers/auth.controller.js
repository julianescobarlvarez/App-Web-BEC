import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAcessToken} from '../libs/jwt.js';
export const register = async (req, res) => {
    const {nombres, apellidos, direccion, telefono, email, contraseña, foto} = req.body;
    try{
        const passwordHash = await bcrypt.hash(contraseña, 11)

        const newUser = new User({
            nombres,
            apellidos,
            direccion,
            telefono,
            email,
            contraseña: passwordHash,
            foto
        });

        const userSaved = await newUser.save();

        const token = await createAcessToken({id: userSaved._id})
        res.cookie("token", token);
        res.json({
           id: userSaved._id,
           nombres: userSaved.nombres,
           email: userSaved.email,
           createdAt: userSaved.createdAt,
           updatedAt: userSaved.updatedAt
        });
        
    }   catch (error){
        res.status(500).json({ message: error.message});
    }
}
export const login = (req, res) => res.send('login');