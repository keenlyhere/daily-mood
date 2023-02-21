const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js")
const { restoreUser } = require("../../utils/auth.js");

// connect restoreUser middleware to API router
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.post("/test", (req, res) => {
    res.json({
        requestBody: req.body
    })
})

module.exports = router;
