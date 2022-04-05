'use strict';

const {
  db,
  models: { User, Project, Roto },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  try {
    const Cody = await User.create({ username: 'cody', password: '123' });
    const Murphy = await User.create({ username: 'murphy', password: '123' });
    const Merle = await User.create({ username: 'merle', password: '123' });
    const Leah = await User.create({ username: 'leah', password: '123' });

    //Creating Projects
    const MerleDanceProject = await Project.create({
      title: 'Hot Girl Shit',
      videoUrl:
        'https://res.cloudinary.com/rotoflo/video/upload/v1648308475/rxkwlwzygaakk9bclga1.mkv'
    });
    const LeahDanceProject = await Project.create({
      title: 'Coffee mmmm',
      videoUrl: 'https://res.cloudinary.com/rotoflo/video/upload/v1647882718/ibktfhzhieglvsivecnn.mov'
    });

    const YerBubbles = await Project.create({
      title: "Yer Bubbles",
      videoUrl: 'https://res.cloudinary.com/rotoflo/video/upload/v1648228496/lvc8vxlvlpy32a4wvepu.mkv'
    })

    const SpookyDance = await Project.create({
      title: 'Spoooooky',
      videoUrl: 'https://res.cloudinary.com/rotoflo/video/upload/v1648159174/fzcuixjfbbqjh09qnwr1.mkv'
    })

    //Creating Rotos
    const pinkBubbles = await Roto.create({
      styleName: 'pinkBubbles',
    });

    const skeleton = await Roto.create({
      styleName: 'skeleton',
    });

    const geometric = await Roto.create({
      styleName: 'geometric',
    });

    const flubber = await Roto.create({
      styleName: 'flubber'
    })

    const box = await Roto.create({
      styleName: 'box'
    })

    const radiate = await Roto.create({
      styleName: 'radiate'
    })

    const prism = await Roto.create({
      styleName: 'prism'
    })

    //Creating associations
    await MerleDanceProject.setUser(Merle);
    await MerleDanceProject.setRoto(pinkBubbles);

    await LeahDanceProject.setUser(Leah);
    await LeahDanceProject.setRoto(None);

    await YerBubbles.setUser(Leah);
    await YerBubbles.setRoto(pinkBubbles);

    await SpookyDance.setUser(Leah);
    await SpookyDance.setRoto(None);

  } catch (err) {
    console.log(err);
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
