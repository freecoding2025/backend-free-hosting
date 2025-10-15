const models = require('../models');

async function seed() {
  try {
    await models.sequelize.authenticate();
    await models.sequelize.sync();

    const Student = models.Student;

    const samples = [
      { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', enrollmentNo: 'ENR-1001' },
      { firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', enrollmentNo: 'ENR-1002' },
    ];

    for (const s of samples) {
      await Student.findOrCreate({ where: { email: s.email }, defaults: s });
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
}

seed();
