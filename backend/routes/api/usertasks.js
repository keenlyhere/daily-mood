const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { UserTask, User, sequelize } = require("../../db/models");

const { validateQuery } = require("../../utils/validation");

const { Op } = require("sequelize");
const { formatDate } = require("../../utils/dateFormating");

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
                [Op.not]: now,
            },
        },
    });

    if (!allTasks.length > 0) {
        return res.json({
            userTasks: [],
        });
    }

    const toDoArray = [];

    allTasks.forEach((task) => {
        if (task.taskType === "To-Do") {
            toDoArray.push(task);
        }
    });


    const unfinishedToDo = [];

    const unFinishedToDoCategories = new Set();
    toDoArray.forEach((task) => {
        task = task.toJSON();

        if (!task.isCompleted) {
            unfinishedToDo.push(task);
            unFinishedToDoCategories.add(task.categoryName);
        }
    });

    const unfinishedToDoCategories = [...unFinishedToDoCategories];

    // ---> FIND ALL TASKS FOR TODAY
    const toDoToday = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: now,
            },
        },
    });

    const dailyToDo = [];

    toDoToday.forEach((task) => {
        if (task.taskType === "To-Do") {
            dailyToDo.push(task);
        }
    });

    const toDoTodayCategoriesSet = new Set();
    dailyToDo.forEach((task) => {
        task = task.toJSON();
        toDoTodayCategoriesSet.add(task.categoryName);
    });

    const toDoTodayCategories = [...toDoTodayCategoriesSet];

    // ---> FIND ALL MOST RECENT HABITS
    // ---> IF CURRENT DAY HAS NO HABITS, THEN CREATE HABITS FOR THE DAY BASED ON THE MOST RECENT HABITS

    const mostRecentDay = await UserTask.max("day");
    const habitsOnMostRecentDay = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: mostRecentDay,
                taskType: "Habit",
            },
        },
    });

    const habitsToday = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: now,
                taskType: "Habit",
            },
        },
    });

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
                pointsEarned: 0,
            });

            dailyHabits.push(newHabit);

            console.log("NEW HABIT", newHabit);
        }

        const habitsTodayCategoriesSet = new Set();
        dailyHabits.forEach((habit) => {
            habit = habit.toJSON();
            habitsTodayCategoriesSet.add(habit.categoryName);
        });

        const habitsTodayCategories = [...habitsTodayCategoriesSet];

        const allTasksData = {
            dailyHabits,
            habitsTodayCategories,
            unfinishedToDo,
            unfinishedToDoCategories,
            toDoToday: dailyToDo,
            toDoTodayCategories,
        };

        return res.json(allTasksData);
    }

    const habitsTodayCategoriesSet = new Set();
    habitsToday.forEach((habit) => {
        habit = habit.toJSON();
        habitsTodayCategoriesSet.add(habit.categoryName);
    });

    const habitsTodayCategories = [...habitsTodayCategoriesSet];

    const allTasksData = {
        habitsToday,
        habitsTodayCategories,
        unfinishedToDo,
        unfinishedToDoCategories,
        toDoToday: dailyToDo,
        toDoTodayCategories,
    };

    // console.log("allTasksData>>>>>\n", allTasksData)
    return res.json(allTasksData);
});

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

    const date = req.params.day;
    const now = formatDate(new Date());
    if (date > now) {
        return res.redirect("/tasks/future")
    }

    const queriedToDoDay = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: date,
            },
        },
    });

    const dayToDoArray = [];

    queriedToDoDay.forEach((task) => {
        if (task.taskType === "To-Do") {
            dayToDoArray.push(task);
        }
    });

    const toDoDayCategoriesSet = new Set();
    dayToDoArray.forEach((task) => {
        task = task.toJSON();
        toDoDayCategoriesSet.add(task.categoryName);
    });

    const toDoDayCategories = [...toDoDayCategoriesSet];

    const queriedHabitsDay = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: date,
                taskType: "Habit",
            },
        },
    });

    const habitsDayCategoriesSet = new Set();
    queriedHabitsDay.forEach((habit) => {
        habit = habit.toJSON();
        habitsDayCategoriesSet.add(habit.categoryName);
    });

    const habitsDayCategories = [...habitsDayCategoriesSet];

    const queriedDayData = {
        habits: queriedHabitsDay,
        habitsDayCategories,
        toDo: dayToDoArray,
        toDoDayCategories,
    };

    return res.json(queriedDayData);
});

// POST /api/tasks
router.post("/", requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"],
        },
    });

    const { categoryName, taskName, taskType, taskIcon } = req.body;

    const now = new Date();

    const err = {};
    err.errors = [];
    if (taskType !== "Habit" && taskType !== "To-Do") {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Invalid input";
        err.message = "";
        err.errors.push({ taskType: "Task type must be 'Habit' or 'To-Do'." });
        return next(err);
    }

    // if task type is a habit, then make sure it is not the same
    // as one that already exists

    const queriedHabitsDay = await UserTask.findAll({
        where: {
            [Op.and]: {
                userId: user.id,
                day: now,
                taskType: "Habit",
            },
        },
    });

    const habitsDayCategoriesSet = new Set();
    queriedHabitsDay.forEach((habit) => {
        habit = habit.toJSON();
        habitsDayCategoriesSet.add(habit.categoryName);
    });

    const habitsDayCategories = [...habitsDayCategoriesSet];

    if (taskType === "Habit") {
        if (habitsDayCategories.includes(categoryName)) {
            for (let i = 0; i < queriedHabitsDay.length; i++) {
                let habit = queriedHabitsDay[i];

                if (taskName === habit.taskName) {
                    err.title = "Forbidden";
                    err.status = 403;
                    err.statusCode = 403;
                    err.message = "You have already created a habit in the category with the same name.";
                    err.errors.push("You have already created a habit in the category with the same name.");
                    return next(err);
                }
            }
        }
    }

    switch (taskType) {
        case "Habit": {
            let newHabit = await user.createUserTask({
                day: now,
                categoryName,
                taskName,
                taskIcon,
                taskType,
                isCompleted: false,
                pointsEarned: 0,
            });

            newHabit = newHabit.toJSON();

            newHabit.User = currentUser;
            // console.log("USER MOOLAH>>>>", currentUser.moolah);

            res.status(201);
            return res.json({
                habit: newHabit,
            });
        }
        case "To-Do": {
            let newToDo = await user.createUserTask({
                day: now,
                categoryName,
                taskName,
                taskIcon,
                taskType,
                isCompleted: false,
                pointsEarned: 0,
            });

            newToDo = newToDo.toJSON();
            newToDo.User = currentUser;

            res.status(201);
            return res.json({
                task: newToDo,
            });
        }
        default:
            break;
    }
});

// EDIT /api/task/:taskId
router.put("/:taskId", requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"],
        },
    });

    const taskId = req.params.taskId;

    const updateTask = await UserTask.findByPk(taskId);

    const err = {};
    if (!updateTask) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Task could not be found";
        return next(err);
    }

    if (user.id !== updateTask.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot edit a Task that is not yours";
        return next(err);
    }

    const { categoryName, taskName, taskType, taskIcon, isCompleted } = req.body;

    switch (taskType) {
        case "Habit": {
            updateTask.categoryName = categoryName;
            updateTask.taskName = taskName;
            updateTask.taskType = taskType;
            updateTask.taskIcon = taskIcon;

            if (isCompleted === true) {
                updateTask.isCompleted = true;

                if (updateTask.pointsEarned === 0) {
                    updateTask.pointsEarned = 1;
                    currentUser.moolah += 1;
                }

                await currentUser.save();
            }

            if (isCompleted === false) {
                updateTask.isCompleted = false;

                if (updateTask.pointsEarned === 1) {
                    updateTask.pointsEarned = 0;
                    currentUser.moolah -= 1;
                }

                await currentUser.save();
            }

            await updateTask.save();

            res.status(201);
            return res.json({
                habit: updateTask,
            });
        }
        case "To-Do": {
            updateTask.categoryName = categoryName;
            updateTask.taskName = taskName;
            updateTask.taskType = taskType;
            updateTask.taskIcon = taskIcon;

            if (isCompleted === true) {
                updateTask.isCompleted = true;

                if (updateTask.pointsEarned === 0) {
                    updateTask.pointsEarned = 1;
                    currentUser.moolah += 1;
                }

                await currentUser.save();
            }

            if (isCompleted === false) {
                updateTask.isCompleted = false;

                if (updateTask.pointsEarned === 1) {
                    updateTask.pointsEarned = 0;
                    currentUser.moolah -= 1;
                }

                await currentUser.save();
            }

            await updateTask.save();

            res.status(201);
            return res.json({
                task: updateTask,
            });
        }
        default:
            break;
    }
});

// DELETE /api/tasks/:taskId - specific task
router.delete("/:taskId", requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"],
        },
    });

    const taskId = req.params.taskId;

    // const currentUser = await
    let deleteTask = await UserTask.findByPk(taskId);

    const err = {};
    if (!deleteTask) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Task couldn't be found";
        return next(err);
    }

    if (user.id !== deleteTask.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot delete a Task that is not yours";
        return next(err);
    }

    await deleteTask.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200,
    });
});

// DELETE /api/tasks/:taskType/:taskCategory - entire category of tasks
router.delete("/:taskType/:taskCategory/:date", requireAuth, async (req, res, next) => {
    const { user } = req;

    const currentUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ["birthday", "displayPic", "theme", "activePet", "activeBg", "updatedAt"],
        },
    });

    const { taskType, taskCategory, date } = req.params;

    if (taskType === "To-Do") {
        const deleteToDoCategory = await UserTask.findAll({
            where: {
                userId: user.id,
                taskType,
                categoryName: taskCategory,
                day: date
            }
        })

        const err = {};
        if (!deleteToDoCategory) {
            err.status = 404;
            err.statusCode = 404;
            err.title = "Not found";
            err.message = "To-Do category could not be found";
            return next(err);
        }

        const deletedTaskIds = [];
        deleteToDoCategory.forEach(task => deletedTaskIds.push(task.id));

        const deleteCategoryTasks = await UserTask.destroy({
            where: {
                userId: user.id,
                taskType,
                categoryName: taskCategory,
                day: date
            }
        })

        return res.json({deletedTaskIds});

    }

    // const currentUser = await
    let deleteTaskCategory = await UserTask.findAll({
        where: {
            userId: user.id,
            taskType,
            categoryName: taskCategory
        }
    });

    const err = {};
    if (!deleteTaskCategory) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Task category could not be found";
        return next(err);
    }

    const deletedTaskIds = [];
    deleteTaskCategory.forEach(task => deletedTaskIds.push(task.id));

    // console.log("DELETE TASK CATEGORY - BACKEND ---> \n", deleteTaskCategory)


    const deleteCategoryTasks = await UserTask.destroy({
        where: {
            userId: user.id,
            taskType,
            categoryName: taskCategory
        }
    })
    
    res.json({deletedTaskIds})

    // res.json({
    //     message: "Successfully deleted",
    //     statusCode: 200,
    // });
});

module.exports = router;
