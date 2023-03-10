const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js")
const dayEntriesRouter = require("./dayentries.js")
const userTasksRouter = require("./usertasks.js")
const petBgsRouter = require("./petbgs.js");
const { restoreUser } = require("../../utils/auth.js");

// connect restoreUser middleware to API router
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/day", dayEntriesRouter);

router.use("/tasks", userTasksRouter);

router.use("/tasks", userTasksRouter);

router.use("/petbg", petBgsRouter);

router.post("/test", (req, res) => {
    res.json({
        requestBody: req.body
    })
})

module.exports = router;
