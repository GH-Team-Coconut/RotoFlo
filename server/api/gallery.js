const router = require("express").Router();
const {
  models: { Project, Video },
} = require("../db");
const { requireToken } = require("./security");

router.get("/gallery", requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    console.log('user id in api **********************', req.user.id)
    const gallery = await Project.findAll({
      where: {
        userId: req.user.id
      }
      // include: [Video],
    });
    res.send(gallery)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
