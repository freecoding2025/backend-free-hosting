const models = require('../models');

async function migrate() {
  try {
    await models.sequelize.authenticate();
    console.log('DB connected, syncing schema...');
    await models.sequelize.sync({ alter: true });
    console.log('Migrations applied (sync complete).');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
}

migrate();
