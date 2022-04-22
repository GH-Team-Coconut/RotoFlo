const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('project', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  videoUrl: {
    type: Sequelize.STRING(1000),
    defaultValue: '',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
