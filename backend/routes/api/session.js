const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Pet } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { formatDate } = require("../../utils/dateFormating");

const router = express.Router();

// validationLogin middleware
// checks to see if req.body.credential and req.body.password are empty
// return error if either is empty
const validateLogin = [
    check("credential")
        .exists({ checkFalsy: true })
        .withMessage("Please provide an email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
    handleValidationErrors
];

// POST /api/session to login
router.post("/", validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    // if user does not exist
    if (!user) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
    }

    await setTokenCookie(res, user);

    const now = new Date();

    const activePetId = user.activePet;
    const userActivePet = await Pet.findByPk(activePetId);

    if (formatDate(now) !== user.lastLogin) {
        console.log("activePet", userActivePet)
        const newHealth  = userActivePet.health - 5;
        await userActivePet.update({
            health: newHealth
        })

        await user.update({
            lastLogin: now,
            pointsEarnedToday: 0
        })
    }

    return res.json({
        user: user,
        activePet: userActivePet
    })
})

// DELETE /api/session to logout
router.delete("/", (_req, res) => {
    res.clearCookie("token");
    return res.json({ message: "success" });
})

// GET /api/session to restore session user
// uses restoreUser middleware to get the token from cookies
router.get("/", restoreUser, async (req, res) => {
    const { user } = req;
    if (user) {
        const now = new Date();

        const activePetId = user.activePet;
        const userActivePet = await Pet.findByPk(activePetId);

        if (formatDate(now) !== user.lastLogin) {
            console.log("activePet", userActivePet)
            const newHealth  = userActivePet.health - 5;
            await userActivePet.update({
                health: newHealth
            })

            await user.update({
                lastLogin: now,
                pointsEarnedToday: 0
            })
        }

        return res.json({
            user: user.toSafeObject()
        })
    } else {
        return res.json({
            user: null
        })
    }
})

module.exports = router;
