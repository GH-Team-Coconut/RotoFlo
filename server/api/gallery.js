const router = require("express").Router();
const {
  models: { Project },
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
    });
    res.send(gallery);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const newProject = await Project.create({
      userId: req.user.id,
      title: req.body.title,
      videoUrl: req.body.videoUrl,
      rotoId: req.body.rotoId,
    });
    if (newProject) {
      res.status(201).send(newProject);
    }
    res.status(409).send("not today");
  } catch (error) {
    console.error(
      "you thought you could post a effing video??? THINK AGAIN",
      error
    );
    next(error);
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
    });
    res.send(project);
  } catch (err) {
    next(err);
  }
});

router.delete("/:projectId", requireToken, async (req, res, next) => {
  //DELETE FROM CLOUDINARY STILL!!!
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const project = await Project.findOne({
      where: {
        id: req.params.projectId,
        userId: req.user.id,
      },
    });
    if (project) {
      project.destroy();
      return res.status(200).send(project);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
