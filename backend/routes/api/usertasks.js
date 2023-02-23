const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { UserTask, User, sequelize } = require("../../db/models");

const { validateQuery } = require("../../utils/validation");

const { Op } = require("sequelize");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");
const { formatDate } = require("../../utils/dateFormating");
const { moodParser } = require("../../utils/moods");

const router = express.Router();

// GET /api/tasks/current - get's current day
router.get("/current", requireAuth, async (req, res, next) => {
    const { user } = req;
    // query for most recent day
    // most recent day should have the most updated habits
    // then can grab all the unique habits from that day and repeat them for the user;
    const now = new Date();

    // ---> SEARCH FOR ALL UNFINISHED TASKS

    const allTasks = await UserTask.findAll({
        where: {
            userId: user.id,
            day: {
                [Op.not]: now
            }
        }
    })

    if (!allTasks.length > 0) {
        return res.json({
            userTasks: []
        })
    }

    const toDoArray = [];

    allTasks.forEach(task => {

        if (task.taskType === "To-Do") {
            toDoArray.push(task);
        }
    })

    const unfinishedToDoObj = {
        unfinishedToDo: []
    }

    const unFinishedToDoCategories = new Set();
    toDoArray.forEach(task => {
        task = task.toJSON();

        if (!task.isCompleted) {
            unfinishedToDoObj.unfinishedToDo.push(task);
            unFinishedToDoCategories.add(task.categoryName);

        }
    })

    unfinishedToDoObj.unfinishedToDoCategories = [...unFinishedToDoCategories]

    // ---> FIND ALL TASKS FOR TODAY
    const toDoToday = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: now
            }
        }
    })

    const dailyToDo = [];

    toDoToday.forEach(task => {

        if (task.taskType === "To-Do") {
            dailyToDo.push(task);
        }
    })

    const toDoTodayCategoriesSet = new Set();
    dailyToDo.forEach(task => {
        task = task.toJSON();
        toDoTodayCategoriesSet.add(task.categoryName);
    })

    const toDoTodayCategories = [...toDoTodayCategoriesSet];

    // ---> FIND ALL MOST RECENT HABITS
    // ---> IF CURRENT DAY HAS NO HABITS, THEN CREATE HABITS FOR THE DAY BASED ON THE MOST RECENT HABITS

    const mostRecentDay = await UserTask.max("day");
    const habitsOnMostRecentDay = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: mostRecentDay,
                taskType: "Habit"
            }
        },
    })

    const habitsToday = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: now,
                taskType: "Habit"
            }
        }
    })

    const dailyHabits = [];
    if (!habitsToday.length) {
        console.log("no habits today\n\n\n\n\n\n");
        for (let i = 0; i < habitsOnMostRecentDay.length; i++) {
            let habit = habitsOnMostRecentDay[i];

            const newHabit = await user.createUserTask({
                day: now,
                categoryName: habit.categoryName,
                taskName: habit.taskName,
                taskIcon: habit.taskIcon,
                taskType: habit.taskType,
                isCompleted: false,
                pointsEarned: 0
            })

            dailyHabits.push(newHabit);

            console.log("NEW HABIT", newHabit);
        }

        const habitsTodayCategoriesSet = new Set();
        dailyHabits.forEach(habit => {
            habit = habit.toJSON();
            habitsTodayCategoriesSet.add(habit.categoryName);
        })

        const habitsTodayCategories = [...habitsTodayCategoriesSet];

        const allTasksData = {
            dailyHabits,
            habitsTodayCategories,
            unfinishedToDoObj,
            toDoToday: dailyToDo,
            toDoTodayCategories
        };

        return res.json(allTasksData)
    }

    const habitsTodayCategoriesSet = new Set();
    habitsToday.forEach(habit => {
        habit = habit.toJSON();
        habitsTodayCategoriesSet.add(habit.categoryName);
    })

    const habitsTodayCategories = [...habitsTodayCategoriesSet];

    const allTasksData = {
        habitsToday,
        habitsTodayCategories,
        unfinishedToDoObj,
        toDoToday: dailyToDo,
        toDoTodayCategories
    };

    // console.log("allTasksData>>>>>\n", allTasksData)
    return res.json(allTasksData)

})

// router.get("/current", requireAuth, async (req, res, next) => {
//     const { user } = req;
//     // query for current day
//     // if an entry does not exist yet i.e. arraylength 0?, then frontend should have forms?
//     // otherwise, should display the data for that day
//     const now = new Date();
//     const allTasks = await UserTask.findAll({
//         where: {
//             userId: user.id
//         }
//     })

//     if (!allTasks.length > 0) {
//         return res.json({
//             userTasks: []
//         })
//     }

//     const toDoArray = [];
//     const habitArray = [];

//     // const uniqueHabits = {};
//     // get all the tasks that are habits
//     // separate habits based on category name
//     // from there remove the ones with same taskName

//     allTasks.forEach(task => {

//         if (task.taskType === "Habit") {
//             habitArray.push(task);
//         } else {
//             toDoArray.push(task);
//         }
//     })

//     const unfinishedToDoObj = {
//         unfinishedToDo: []
//     }

//     const unFinishedToDoCategories = new Set();
//     toDoArray.forEach(task => {
//         task = task.toJSON();

//         if (!task.isCompleted) {
//             unfinishedToDoObj.unfinishedToDo.push(task);
//             unFinishedToDoCategories.add(task.categoryName);

//         }
//     })

//     unfinishedToDoObj.unfinishedToDoCategories = [...unFinishedToDoCategories]

//     const toDoCategories = {};
//     // unFinishedToDo.forEach(task => {
//     //     if (!toDoCategories[task.categoryName]) {
//     //         toDoCategories[task.categoryName] = [{
//     //             taskName: task.taskName,
//     //             taskIcon: task.taskIcon,
//     //             categoryName: task.categoryName,
//     //             isCompleted: task.isCompleted
//     //         }];
//     //     } else {
//     //         toDoCategories[habit.categoryName].push({
//     //             taskName: habit.taskName,
//     //             taskIcon: habit.taskIcon,
//     //             categoryName: habit.categoryName,
//     //             isCompleted: habit.isCompleted
//     //         });
//     //     }
//     // })

//     const habitCategories = {};

//     habitArray.forEach(habit => {
//         if (!habitCategories[habit.categoryName]) {
//             habitCategories[habit.categoryName] = [{
//                 taskName: habit.taskName,
//                 taskIcon: habit.taskIcon,
//                 categoryName: habit.categoryName,
//                 isCompleted: habit.isCompleted
//             }];
//         } else {
//             habitCategories[habit.categoryName].push({
//                 taskName: habit.taskName,
//                 taskIcon: habit.taskIcon,
//                 categoryName: habit.categoryName,
//                 isCompleted: habit.isCompleted
//             });
//         }
//     })

//     const habitCategoryNames = Object.keys(habitCategories);

//     // this returns:
//     // "categoryToName": {
//     //     "Dailies": [
//     //         "Work out",
//     //         "Breakfast",
//     //         "Lunch",
//     //         "Dinner"
//     //     ]
//     // }

//     const categoryToName = {};
//     habitArray.forEach((habit) => {
//         if (!categoryToName[habit.categoryName]) {
//             categoryToName[habit.categoryName] = [habit.taskName]
//         } else {
//             if (!categoryToName[habit.categoryName].includes(habit.taskName)) {
//                 categoryToName[habit.categoryName].push(habit.taskName);
//             }
//         }
//     })

//     const userHabits = [];

//     // habitCategoryNames.forEach(habitCategory => {
//     //     if ()
//     // })

//     const allTasksData = {
//         userTasks: {
//             habits: habitArray,
//             // toDo: unFinishedToDo,
//             // toDo: unfinishedToDoObj,
//             categoryToName,
//             habitCategoryNames,
//             habitCategories,
//             // uniqueHabits
//         }
//     };

//     console.log("allTasksData>>>>>\n", allTasksData)
//     return res.json(allTasksData)

// })


// GET /api/tasks/:day - get specific day
router.get("/:day", requireAuth, async (req, res, next) => {
    const { user } = req;

    const date = req.params.day

    const queriedToDoDay = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: date
            }
        }
    })

    const dayToDoArray = [];

    queriedToDoDay.forEach(task => {

        if (task.taskType === "To-Do") {
            dayToDoArray.push(task);
        }
    })

    const toDoDayCategoriesSet = new Set();
    dayToDoArray.forEach(task => {
        task = task.toJSON();
        toDoDayCategoriesSet.add(task.categoryName);
    })

    const toDoDayCategories = [...toDoDayCategoriesSet];

    const queriedHabitsDay = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: date,
                taskType: "Habit"
            }
        }
    })

    const habitsDayCategoriesSet = new Set();
    queriedHabitsDay.forEach(habit => {
        habit = habit.toJSON();
        habitsDayCategoriesSet.add(habit.categoryName);
    })

    const habitsDayCategories = [...habitsDayCategoriesSet];

    const queriedDayData = {
        habits: queriedHabitsDay,
        habitsDayCategories,
        toDo: dayToDoArray,
        toDoDayCategories
    };

    return res.json(queriedDayData)

})

// POST /api/day
router.post("/", singleMulterUpload("image"), requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"]
        }
    });

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
                entryData
            });

            mood = mood.toJSON();

            currentUser.moolah += 5;
            currentUser.save();

            mood.User = currentUser;
            // console.log("USER MOOLAH>>>>", currentUser.moolah);

            res.status(201);
            return res.json({
                dayEntry: mood
            });
        }
        case "dayImage": {
            let image = await user.createDayEntry({
                day: formatDate(now),
                entryType,
                entryData: newDayImage
            })

            image = image.toJSON();

            currentUser.moolah += 5;
            currentUser.save();
            image.User = currentUser;

            res.status(201);
            return res.json({
                dayEntry: image
            });
        }
        case "dayJournal": {
            let journal = await user.createDayEntry({
                day: formatDate(now),
                entryType,
                entryData
            })

            journal = journal.toJSON();

            currentUser.moolah += 5;
            currentUser.save();
            journal.User = currentUser;

            res.status(201);
            return res.json({
                dayEntry: journal
            });
        }
        default:
            break;
    }

    return res.json({
        "error": "should not see this"
    })
})

// EDIT /api/day/:entryId
router.put("/:entryId", singleMulterUpload("image"), requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"]
        }
    });

    const entryId = req.params.entryId;

    const updateDay = await DayEntry.findByPk(entryId);
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
                dayEntry: updateDay
            })

        }
        case "dayImage": {
            updateDay.entryData = updateDayImage;

            // console.log("dayImage - UPDATED - image:", updateDay);
            await updateDay.save();

            res.status(201);
            return res.json({
                dayEntry: updateDay
            })
        }
        case "dayJournal": {
            updateDay.entryData = entryData;

            console.log("dayJournal - UPDATED - journal:", updateDay);
            await updateDay.save();

            res.status(201);
            return res.json({
                dayEntry: updateDay
            })
        }
        default:
            break;
    }

})

router.delete("/:entryId", requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"]
        }
    });

    const entryId = req.params.entryId;

    // const currentUser = await
    let deleteEntry = await DayEntry.findByPk(entryId);

    const err = {};
    if (!deleteEntry) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
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

    // deduct points from user if they delete an entry
    currentUser.moolah -= 5;
    currentUser.save();
    // console.log("DELETED ENTRY - MOOLAH", currentUser.moolah);

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
