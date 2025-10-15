const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');

router.post('/', async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.firstName || !payload.lastName || !payload.email || !payload.enrollmentNo) {
      return res.status(400).json({ error: 'firstName, lastName, email and enrollmentNo are required' });
    }
    const created = await studentService.createStudent(payload);
    res.status(201).json({ student: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create student', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await studentService.listStudents();
    res.json({ students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to list students', details: err.message });
  }
});

module.exports = router;
