const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('roto', {
  styleName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
