const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { DayEntry, User, sequelize } = require("../../db/models");

const { validateQuery } = require("../../utils/validation");

const { Op } = require("sequelize");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");
const { formatDate } = require("../../utils/dateFormating");
const { moodParser } = require("../../utils/moods");

const router = express.Router();

// GET /api/day/current - get's current day
router.get("/current", requireAuth, async (req, res, next) => {
    const { user } = req;
    // query for current day
    // if an entry does not exist yet i.e. arraylength 0?, then frontend should have forms?
    // otherwise, should display the data for that day
    const now = new Date();
    const today = await DayEntry.findAll({
        where: {
            [Op.and]: {
                // day: formatDate(now),
                day: now,
                userId: user.id,
            },
        },
    });

    if (!today.length > 0) {
        return res.json({
            dayEntries: [],
        });
    }

    const dayEntriesArray = [];

    today.forEach((dayEntry) => {
        dayEntry = dayEntry.toJSON();
        dayEntriesArray.push(dayEntry);
    });

    const queriedDayData = {
        dayEntries: dayEntriesArray,
    };

    // console.log("queriedDAY>>>>>\n", queriedDayData);
    return res.json(queriedDayData);
});

// GET /api/day/:day - get specific day
router.get("/:day", requireAuth, async (req, res, next) => {
    const { user } = req;

    const date = req.params.day;

    const queriedDay = await DayEntry.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: date,
            },
        },
    });

    const queriedDayArray = [];

    queriedDay.forEach((dayQuery) => {
        dayQuery = dayQuery.toJSON();
        queriedDayArray.push(dayQuery);
        // console.log(">>> DAY QUERY >>>\n", dayQuery.day === date)
        // if (dayQuery.day === date) {
        // }
    });

    const queriedDayData = {
        dayEntries: queriedDayArray,
    };

    // console.log("queriedDAY>>>>>\n", queriedDayData);
    return res.json(queriedDayData);
});

// POST /api/day
router.post("/", singleMulterUpload("image"), requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"],
        },
    });

    const { entryType, entryData } = req.body;
    let newDayImage;

    const now = new Date();

    const today = await DayEntry.findAll({
        where: {
            [Op.and]: {
                day: formatDate(now),
                userId: user.id,
            },
        },
    });

    const err = {};
    err.errors = [];
    if (today.length) {
        for (let i = 0; i < today.length; i++) {
            let entry = today[i];

            if (entry.entryType === entryType) {
                err.title = "Forbidden";
                err.status = 403;
                err.statusCode = 403;
                err.message = "You have already created an entry for the day.";
                err.errors.push("You have already created an entry for the day.");
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
                entryData,
            });

            mood = mood.toJSON();

            mood.User = currentUser;
            // console.log("USER MOOLAH>>>>", currentUser.moolah);

            res.status(201);
            return res.json({
                dayEntry: mood,
            });
        }
        case "dayImage": {
            let image = await user.createDayEntry({
                day: formatDate(now),
                entryType,
                entryData: newDayImage,
            });

            image = image.toJSON();

            image.User = currentUser;

            res.status(201);
            return res.json({
                dayEntry: image,
            });
        }
        case "dayJournal": {
            let journal = await user.createDayEntry({
                day: formatDate(now),
                entryType,
                entryData,
            });

            journal = journal.toJSON();

            journal.User = currentUser;

            res.status(201);
            return res.json({
                dayEntry: journal,
            });
        }
        default:
            break;
    }

    return res.json({
        error: "should not see this",
    });
});

// POST /api/day/:year/:month/:day
router.post("/:day", singleMulterUpload("image"), requireAuth, async (req, res, next) => {
    const { user } = req;
    const day = req.params.day;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"],
        },
    });

    const { entryType, entryData } = req.body;
    let newDayImage;

    // const selectedDate = year + `0${month}`.slice(-2) + `0${day}`.slice(-2);
    // console.log("selectedDate ===>", selectedDate);

    const today = await DayEntry.findAll({
        where: {
            [Op.and]: {
                day: day,
                userId: user.id,
            },
        },
    });

    const err = {};
    err.errors = [];
    if (today.length) {
        for (let i = 0; i < today.length; i++) {
            let entry = today[i];

            if (entry.entryType === entryType) {
                err.title = "Forbidden";
                err.status = 403;
                err.statusCode = 403;
                err.message = "You have already created an entry for the day.";
                err.errors.push("You have already created an entry for the day.");
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
                day: day,
                entryType,
                entryData,
            });

            mood = mood.toJSON();

            mood.User = currentUser;
            // console.log("USER MOOLAH>>>>", currentUser.moolah);

            res.status(201);
            return res.json({
                dayEntry: mood,
            });
        }
        case "dayImage": {
            let image = await user.createDayEntry({
                day: day,
                entryType,
                entryData: newDayImage,
            });

            image = image.toJSON();

            image.User = currentUser;

            res.status(201);
            return res.json({
                dayEntry: image,
            });
        }
        case "dayJournal": {
            let journal = await user.createDayEntry({
                day: day,
                entryType,
                entryData,
            });

            journal = journal.toJSON();

            journal.User = currentUser;

            res.status(201);
            return res.json({
                dayEntry: journal,
            });
        }
        default:
            break;
    }

    return res.json({
        error: "should not see this",
    });
});

// EDIT /api/day/:entryId
router.put("/:entryId", singleMulterUpload("image"), requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"],
        },
    });

    const entryId = req.params.entryId;

    const updateDay = await DayEntry.findByPk(entryId);
    let updateDayImage;

    const err = {};
    if (!updateDay) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
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

    const { entryType, entryData } = req.body;

    if (req.file) {
        // console.log("hit update image req file")
        updateDayImage = await singlePublicFileUpload(req.file);
    } else {
        // console.log("hit not update image", entryData)
        updateDayImage = entryData;
    }

    switch (entryType) {
        case "dayMood": {
            updateDay.entryData = entryData;
            // console.log("dayMood - UPDATED - mood:", updateDay.dataValues);
            await updateDay.save();

            // console.log("updateDay should show user", updateDay);

            res.status(201);
            return res.json({
                dayEntry: updateDay,
            });
        }
        case "dayImage": {
            updateDay.entryData = updateDayImage;

            // console.log("dayImage - UPDATED - image:", updateDay);
            await updateDay.save();

            res.status(201);
            return res.json({
                dayEntry: updateDay,
            });
        }
        case "dayJournal": {
            updateDay.entryData = entryData;

            // console.log("dayJournal - UPDATED - journal:", updateDay);
            await updateDay.save();

            res.status(201);
            return res.json({
                dayEntry: updateDay,
            });
        }
        default:
            break;
    }
});

router.delete("/:entryId", requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"],
        },
    });

    const entryId = req.params.entryId;

    // const currentUser = await
    let deleteEntry = await DayEntry.findByPk(entryId);

    const err = {};
    if (!deleteEntry) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "DayEntry couldn't be found";
        return next(err);
    }

    if (user.id !== deleteEntry.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot delete a DayEntry that is not yours";
        return next(err);
    }

    await deleteEntry.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200,
    });
});

// GET /api/day/moods/:year/:month get all moods in a month
router.get("/moods/:year/:month", requireAuth, async (req, res, next) => {
    const { user } = req;

    let { year, month } = req.params;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, Number(month) + 1, 0);

    const allMoodsInMonth = await DayEntry.findAll({
        where: {
            userId: user.id,
            entryType: "dayMood",
            day: {
                [Op.between]: [startDate, endDate]
            }
        },
        order: [[ "day", "ASC" ]]
    })

    if (!allMoodsInMonth.length > 0) {
        return res.json({
            monthlyMoods: [],
        });
    }

    return res.json({
        monthlyMoods: allMoodsInMonth
    })
})

module.exports = router;
