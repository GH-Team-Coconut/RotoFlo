const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('video', {
  videoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
});
