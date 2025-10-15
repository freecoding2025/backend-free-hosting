// app.js
const express = require('express');

const app = express();
app.use(express.json());

// Sequelize models
const models = require('./models');
// a promise that resolves when DB is ready (useful for tests)
const dbReady = models.sequelize.authenticate()
  .then(() => models.sequelize.sync())
  .then(() => true)
  .catch((err) => {
    console.error('DB init error', err);
    return false;
  });

// simple health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'unknown' });
});

// example resource route
app.get('/api/hello', (req, res) => {
  // keep the message compatible with tests
  res.json({ message: 'Hello from API' });
});

// notes endpoints (simple DB-backed example)
app.post('/api/notes', async (req, res) => {
  await dbReady;
  const { title, body } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });
  const created = await models.Note.create({ title, body });
  res.status(201).json({ note: created.toJSON() });
});

app.get('/api/notes', async (req, res) => {
  await dbReady;
  const notes = await models.Note.findAll({ order: [['id', 'ASC']] });
  res.json({ notes: notes.map(n => n.toJSON()) });
});

// export dbReady for tests to wait on
app.dbReady = dbReady;

// register student routes
const studentRoutes = require('./routes/students');
app.use('/api/students', studentRoutes);

// example POST route
app.post('/api/echo', (req, res) => {
  const payload = req.body;
  res.status(201).json({ data: payload });
});

module.exports = app;
