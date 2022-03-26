//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Project = require('./models/Project');
const Roto = require('./models/Roto');
const Video = require('./models/Video');

User.hasMany(Project);//this makes the association go both ways and gives us magic methods.
Project.belongsTo(User); //the thing in the keft of belongsTo has foreign key

Roto.hasOne(Project);
Project.belongsTo(Roto);

Video.hasOne(Project);
Project.belongsTo(Video);

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Project,
    Roto,
    Video
  },
}
