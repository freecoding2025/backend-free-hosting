const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config', 'config.json');
const config = require(configPath)[env];

// Always use the configured dialect (MySQL per user's request).
// Sequelize accepts the config object which may include host, port, dialect, logging, etc.
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

const Note = require('./note')(sequelize, Sequelize.DataTypes);
const Student = require('./student')(sequelize, Sequelize.DataTypes);
db.Note = Note;
db.Student = Student;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
