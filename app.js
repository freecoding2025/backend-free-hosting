const express = require('express');
const cors = require('cors'); // 1. Import the cors package
const studentRoutes = require('./routes/students');

const app = express();

// 2. Use the cors middleware to allow cross-origin requests
// This is the most important part to fix the "Failed to fetch" error.
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// --- API Routes (based on your README.md) ---

app.get('/health', (req, res) => {
  res.send({ status: 'ok', message: 'Server is healthy' });
});

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});

app.post('/api/echo', (req, res) => {
  res.json(req.body);
});

// This is the endpoint your frontend is trying to reach.
app.get('/api/notes', (req, res) => {
  // In a real application, you would fetch these from your database.
  const sampleNotes = [
    { id: 1, title: 'First Note', body: 'This is a sample note from the backend.' },
    { id: 2, title: 'Vue and Express', body: 'They are now connected successfully!' },
  ];
  res.json(sampleNotes);
});

app.post('/api/notes', (req, res) => {
  console.log('Received new note:', req.body);
  res.status(201).json({ message: 'Note created successfully', note: req.body });
});

// --- Student API Routes ---
app.use('/api/students', studentRoutes);

module.exports = app;