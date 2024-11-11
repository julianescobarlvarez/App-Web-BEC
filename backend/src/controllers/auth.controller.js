import User from '../models/user.model.js';

export const register = async (req, res) => {
    const {nombres, apellidos, direccion, telefono, email, foto} = req.body;
    try{
        const newUser = new User({
            nombres,
            apellidos,
            direccion,
            telefono,
            email,
            foto
        });

        const userSaved = await newUser.save();
        res.json(userSaved);
        
    }   catch (error){
        console.log(error);
    }
}
export const login = (req, res) => res.send('login');