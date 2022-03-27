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
    console.log("req.user  in api **********************", req.user);
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

module.exports = router;
