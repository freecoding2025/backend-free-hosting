"use strict";

// Use the project's models to perform idempotent inserts. This prevents unique constraint
// errors when the seeder is re-run (findOrCreate will skip existing records).
module.exports = {
  async up (queryInterface, Sequelize) {
    const models = require('../models');
    const samples = [
      { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', enrollmentNo: 'ENR-1001' },
      { firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', enrollmentNo: 'ENR-1002' }
    ];

    for (const s of samples) {
      try {
        await models.Student.findOrCreate({ where: { email: s.email }, defaults: s });
      } catch (err) {
        console.error('Seeder model error for', s.email, err && err.stack ? err.stack : err);
        throw err;
      }
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('students', {
      email: { [Sequelize.Op.in]: ['alice@example.com', 'bob@example.com'] }
    }, {});
  }
};
