const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { DayEntry, sequelize } = require("../../db/models");

const { validateQuery } = require("../../utils/validation");

const { Op } = require("sequelize");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");
const { formatDate } = require("../../utils/dateFormating");
const { moodParser } = require("../../utils/moods");

const router = express.Router();

// GET /api/day
router.get("/", requireAuth, async (req, res, next) => {
    const { user } = req;
    // query for current day
    // if an entry does not exist yet i.e. arraylength 0?, then frontend should have forms?
    // otherwise, should display the data for that day
    const now = new Date();
    const today = await DayEntry.findAll({
        where: {
            [Op.and]: {
                day: formatDate(now),
                userId: user.id
            }
        }
    })

    console.log("GET DAY - today:", today);

    if (!today.length > 0) {
        return res.json({
            dayEntries: []
        })
    }


    return res.json(today)
})

// POST /api/day
router.post("/", singleMulterUpload("image"), requireAuth, async (req, res, next) => {
    const { user } = req;

    const { entryType, entryData } = req.body;
    let newDayImage;

    const now = new Date();

    const today = await DayEntry.findAll({
        where: {
            [Op.and]: {
                day: formatDate(now),
                userId: user.id
            }
        }
    })


    const err = {};
    err.errors = [];
    if (today.length) {
        for (let i = 0; i < today.length; i++) {
            let entry = today[i];

            if (entry.entryType === entryType) {
                err.title = "Forbidden";
                err.status = 403;
                err.statusCode = 403;
                err.message = "You have already created an entry for the day."
                err.errors.push("You have already created an entry for the day.")
                return next(err);
            }
        }
    }

    if (req.file) {
        newDayImage = await singlePublicFileUpload(req.file);
    } else {
        newDayImage = entryData;
    }

    switch (entryType) {
        case "dayMood": {
            let mood = await user.createDayEntry({
                day: formatDate(now),
                entryType,
                entryData: moodParser(entryData)
            });

            console.log("dayMood - mood:", mood);

            mood = mood.toJSON();
            res.status(201);
            res.json(mood);
        }
        case "dayImage": {
            let image = await user.createDayEntry({
                day: formatDate(now),
                entryType,
                entryData: newDayImage
            })

            console.log("dayImage - image:", image);

            image = image.toJSON();
            res.status(201);
            res.json(image);
        }
        case "dayJournal": {
            let journal = await user.createDayEntry({
                day: formatDate(now),
                entryType,
                entryData
            })

            console.log("dayJournal - journal:", journal);

            journal = journal.toJSON();
            res.status(201);
            res.json(journal);
        }
        default:
            break;
    }

    // {
    //     "pointsEarned": 5,
    //     "id": 27,
    //     "day": "2023-02-22",
    //     "entryType": "dayImage",
    //     "entryData": "https://images.pexels.com/photos/3640930/pexels-photo-3640930.jpeg",
    //     "userId": 7,
    //     "updatedAt": "2023-02-22T08:25:44.723Z",
    //     "createdAt": "2023-02-22T08:25:44.723Z"
    // }

    return res.json({
        "error": "should not see this"
    })
})

// EDIT /api/day/:dayId
router.put("/:dayId", singleMulterUpload("image"), requireAuth, async (req, res, next) => {
    const { user } = req;
    const dayId = req.params.dayId;

    const updateDay = await DayEntry.findByPk(dayId);
    console.log("BACKEND - DayEntry EDIT - updateDay:", updateDay);
    let updateDayImage;

    const err = {};
    if (!updateDay) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "DayEntry could not be found";
        return next(err);
    }

    if (user.id !== updateDay.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot edit a DayEntry that is not yours";
        return next(err);
    }

    const { entryData } = req.body;

    if (req.file) {
        updateDayImage = await singlePublicFileUpload(req.file);
    } else {
        updateDayImage = entryData;
    }

    updateDay.DayEntry = updateDayImage;

    await updateDay.save();

    res.json(updateDay)
})

module.exports = router;
