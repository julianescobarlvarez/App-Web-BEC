import express from 'express';
import morgan from 'morgan'; // para ver las peticiones que llegan al backend
import authRoutes from './routes/auth.routes.js';
import catalogoRoutes from './routes/catalogo.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors()); // para que todos los dominios se puedan comunicar con este servidor
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', catalogoRoutes);
export default app;
