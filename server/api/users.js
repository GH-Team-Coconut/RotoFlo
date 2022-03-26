const router = require("express").Router();
const {
  models: { User },
} = require("../db");

//      /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };
    await User.create(userData);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (user) return res.json(user);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };

    const user = await User.findByPk(req.params.userId);

    if (user) {
      await user.update({ ...userData });
      return res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (user) {
      User.destroy({ where: { id: user.id } });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// router.get("/:userId/gallery", async (req, res, next) => {
//   try{
//     const gallery = await User


//   } catch (err){
//     next(err)
//   }
// });
module.exports = router;
