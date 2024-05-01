import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import path from 'path';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

// ENV Config
dotenv.config();

// Connect to Database
connectDB();
// Initialize Express App
const app = express();

// Use in development only
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Using JSON
app.use(express.json());

// App Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profile', profileRoutes);

const __dirname = path.resolve();

// API Running
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is active..');
    });
}

const PORT = process.env.PORT || 5000;
// Start Express Server
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
