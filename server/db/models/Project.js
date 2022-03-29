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
  secureUrl: {
    type: Sequelize.STRING(1000),
    defaultValue: '',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // },
  //   imageUrl: { //if we decide to makee a thumbnail
  //       type: Sequelize.STRING(1000),
  //       defaultValue: ''
  //   }
});
