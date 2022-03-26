'use strict'

const {db, models: {User, Project, Roto, Video} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users

    const Cody = await User.create({ username: 'cody', password: '123' })
    const Murphy = await User.create({ username: 'murphy', password: '123' })
    const Merle = await User.create({ username: 'merle', password: '123' })


  //Creating Projects
  const MerleDance = await Project.create({
    title: 'Hot Girl Shit'
  });
  // const coffee = await Project.create({
  //   title: 'Coffee mmmm'
  // });

  //creating Videos
  const HotGirlShit = await Video.create({
    videoUrl:'https://res.cloudinary.com/rotoflo/video/upload/v1648308475/rxkwlwzygaakk9bclga1.mkv'
  })

  const PinkBubble = await Roto.create({
    styleName: 'pinkBubble'
  })

  Merle.setProject(MerleDance);
  MerleDance.setVideo(HotGirlShit);
  MerleDance.setRoto(PinkBubble);


  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
