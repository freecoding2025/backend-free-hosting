const { Student } = require('../models');

async function createStudent(payload) {
  const student = await Student.create(payload);
  return student.toJSON();
}

async function listStudents() {
  const rows = await Student.findAll({ order: [['id', 'ASC']] });
  return rows.map(r => r.toJSON());
}

module.exports = { createStudent, listStudents };
