//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Project = require('./models/Project');
const Roto = require('./models/Roto');
const Video = require('./models/Video');

User.hasMany(Project);
Project.belongsTo(User);

Project.hasOne(Roto);
Roto.belongsTo(Project);

Project.hasOne(Video);
Video.belongsTo(Project);

//associations could go here!

module.exports = {
  db,
  models: {
    User,
  },
}
