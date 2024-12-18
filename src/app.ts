import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import courseRoutes from './routers/course';
import userRoutes from './routers/user';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dotGeeksDB'; // Default MongoDB URI

// Middleware to serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit process if DB connection fails
    });

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/courses', courseRoutes); // Course routes

// Serve the main HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/courses.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/courses.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).send('Página não encontrada.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
