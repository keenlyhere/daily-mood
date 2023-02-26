const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Pet, Background } = require ("../../db/models");

const { validateQuery } = require("../../utils/validation");


const router = express.Router();

// GET /api/petbg/current - get users active pet and bg
router.get("/current", requireAuth, async (req, res, next) => {
    const { user } = req;

    const err = {};
    if (!user) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "User could not be found";
        return next(err);
    }

    const activePetId = user.activePet;
    const activeBgId = user.activeBg;

    const activePet = await Pet.findByPk(activePetId);
    const activeBg = await Background.findByPk(activeBgId);

    if (!activePet) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Pet could not be found";
        return next(err);
    }

    if (!activeBg) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Background could not be found";
        return next(err);
    }

    res.json({
        user,
        activePet,
        activeBg
    })
})

// POST /api/petbg/pet - create pet for user

// POST /api/petbg/bg - create bg for user

// PUT /api/petbg/pet/:userId - change active pet for user

// PUT /api/petbg/bg/:userId - change active bg for user

// DELETE /api/petbg/pet/:petId - remove active pet from user's inventory T_T

// DELETE /api/petbg/bg/:petId - remove active bg from user's inventory T_T


module.exports = router;
