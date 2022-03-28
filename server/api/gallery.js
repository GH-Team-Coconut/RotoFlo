const router = require("express").Router();
const {
  models: { Project, Video },
} = require("../db");
const { requireToken } = require("./security");

router.get("/", requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const gallery = await Project.findAll({
      where: {
        userId: req.user.id,
      },
      include: [Video],
    });
    res.send(gallery);
  } catch (err) {
    next(err);
  }
});

router.get("/:projectId", requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const project = await Project.findOne({
      where: {
        id: req.params.projectId,
        userId: req.user.id,
      },
      include: [Video],
    });
    res.send(project);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
