import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config/env.js';
import { errorHandler } from './middleware/error.middleware.js';
import authRoutes from './modules/auth/auth.routes.js';

const app = express();

app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', app: 'HEROES CRM API', version: '1.0.0' });
});

// API Routes
app.use('/api/v1/auth', authRoutes);

// Error Handler
app.use(errorHandler);

export default app;
