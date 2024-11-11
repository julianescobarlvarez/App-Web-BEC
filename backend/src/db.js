import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/becdb');
        console.log('base de datos conectada :D')
    } catch (error) {
        console.log(error);
    }
};