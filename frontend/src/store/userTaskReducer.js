import { csrfFetch } from "./csrf";
import { formatDate } from "../utils/dateFormating";

const LOAD_CURRENT_DAY_TASKS = "userTasks/LOAD_CURRENT_DAY_TASKS";
const LOAD_SPECIFIC_DAY_TASKS = "userTasks/LOAD_SPECIFIC_DAY_TASKS";
const ADD_TASK = "userTasks/ADD_TASK";
const EDIT_TASK = "userTasks/EDIT_TASK";
const DELETE_TASK = "userTasks/DELETE_TASK";
const DELETE_TASK_CATEGORY = "userTasks/DELETE_TASK_CATEGORY";
const EDIT_TASK_CATEGORY = "userTasks/EDIT_TASK_CATEGORY";
const EDIT_CATEGORY_ORDER = "userTasks/EDIT_CATEGORY_ORDER";

const normalize = (tasks) => {
    const normalizedData = {};
    if (!tasks.length) return tasks;
    console.log("TASKS ==>", tasks)
    tasks.forEach(task => normalizedData[task.id] = task);
    console.log("NORMALIZED DATA ---", normalizedData)
    return normalizedData;
}

// action creators
export const actionLoadCurrentDayTasks = (userId, userTasks) => {
    return {
        type: LOAD_CURRENT_DAY_TASKS,
        userId,
        userTasks
    }
}

export const actionLoadSpecificDayTasks = (userId, userTasks) => {
    return {
        type: LOAD_SPECIFIC_DAY_TASKS,
        userId,
        userTasks
    }
}

export const actionAddTask = (task, taskType) => {
    return {
        type: ADD_TASK,
        task,
        taskType
    }
}

export const actionDeleteTask = (taskId) => {
    return {
        type: DELETE_TASK,
        taskId
    }
}

export const actionDeleteTaskCategory = (taskType, deletedTaskIds) => {
    return {
        type: DELETE_TASK,
        taskType,
        deletedTaskIds
    }
}

export const actionEditTask = (taskId, task) => {
    return {
        type: EDIT_TASK,
        taskId,
        task
    }
}

export const actionChangeCatName = (task, taskType) => {
    return {
        type: EDIT_TASK_CATEGORY,
        task,
        taskType
    }
}

export const actionEditCategoryOrder = (userTasks) => {
    return {
        type: EDIT_CATEGORY_ORDER,
        userTasks
    }
}

// thunk actions
export const loadCurrentDayTasks = (userId) => async (dispatch) => {
    const res = await csrfFetch("/api/tasks/current");

    if (res.ok) {
        const userTasks = await res.json();
        // console.log("loadCurrentDay - userTasks:", userTasks);
        dispatch(actionLoadCurrentDayTasks(userId, userTasks));
        return userTasks;
    }
}

export const loadSpecificDayTasks = (userId, date) => async (dispatch) => {
    const res = await csrfFetch(`/api/tasks/${date}`);

    if (res.ok) {
        const entries = await res.json();
        // console.log("loadSpecificDay - entries:", entries);
        dispatch(actionLoadSpecificDayTasks(userId, entries));
        return entries;
    }
}

export const addTask = (newEntry, taskType) => async (dispatch) => {
    const res = await csrfFetch(`/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntry)
    })

    if (res.ok) {
        const task = await res.json();
        // console.log("addTask - taskType:", taskType);
        dispatch(actionAddTask(task.task));
        return task;
    }
}

export const deleteTask = (taskId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deletedTask = await res.json();
        // console.log("deletedTask - :", deletedTask);
        dispatch(actionDeleteTask(taskId));
        return deletedTask;
    }
}

export const deleteTaskCategory = (taskType, taskCategory, date) => async (dispatch) => {
    const res = await csrfFetch(`/api/tasks/${taskType}/${taskCategory}/${date}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deletedTaskIds = await res.json();
        // console.log("deletedTask - :", deletedTaskIds);
        dispatch(actionDeleteTaskCategory(taskType, deletedTaskIds));
        return deletedTaskIds;
    }
}

export const editTask = (taskId, task) => async (dispatch) => {
    const res = await csrfFetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })

    if (res.ok) {
        const editedTask = await res.json();
        // console.log("editTask - editedTask:", editedTask);
        dispatch(actionEditTask(taskId, editedTask.task));
        return editedTask;
    }
}

export const changeCatName = (oldCatName, newCatName, taskType) => async (dispatch) => {
    const res = await csrfFetch(`/api/tasks/${oldCatName}/${newCatName}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ oldCatName, newCatName, taskType })
    })

    if (res.ok) {
        const editedCatName = await res.json();
        // console.log("editedCatName:", editedCatName);
        dispatch(actionChangeCatName(editedCatName.task, taskType));
        return editedCatName;
    }
}

export const editCatOrder = (newOrder, type, isUnfinished) => async (dispatch) => {
    const res = await csrfFetch(`/api/tasks/updateOrder`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ newOrder, type, isUnfinished })
    })

    if (res.ok) {
        const newCatOrder = await res.json();
        dispatch(actionEditCategoryOrder(newCatOrder, type));
        return newCatOrder;
    }
}

const initialState = {
    userTasks: {}
}
export default function userTasksReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CURRENT_DAY_TASKS: {
            const userDayTasksState = { ...state };
            // userDayTasksState.userTasks = normalize(action.userTasks);
            userDayTasksState.userTasks = action.userTasks;

            // if (action.userTasks.habitsToday && action.userTasks.habitsToday.length) {
            //     userDayTasksState.userTasks.habitsToday = normalize(action.userTasks.habitsToday);
            // }

            // if (action.userTasks.toDoToday && action.userTasks.toDoToday.length) {
            //     userDayTasksState.userTasks.toDoToday = normalize(action.userTasks.toDoToday);
            // }

            // if (action.userTasks.unfinishedToDo && action.userTasks.unfinishedToDo.length) {
            //     userDayTasksState.userTasks.unfinishedToDo = normalize(action.userTasks.unfinishedToDo);
            // }

            if (action.userTasks.habitsToday && action.userTasks.habitsToday.length) {
                userDayTasksState.userTasks.habitsToday = action.userTasks.habitsToday;
            }

            if (action.userTasks.toDoToday && action.userTasks.toDoToday.length) {
                userDayTasksState.userTasks.toDoToday = action.userTasks.toDoToday;
            }

            if (action.userTasks.unfinishedToDo && action.userTasks.unfinishedToDo.length) {
                userDayTasksState.userTasks.unfinishedToDo = action.userTasks.unfinishedToDo;
            }

            // console.log("LOAD_CURRENT_DAY_TASKS - userDayTasksState", action.userTasks);
            return userDayTasksState;
        }
        case LOAD_SPECIFIC_DAY_TASKS: {
            const specificDayTasksState = { ...state };
            // specificDayTasksState.tasks = normalize(action.tasks);
            specificDayTasksState.userTasks = action.userTasks;

            if (action.userTasks.habits.length) {
                specificDayTasksState.userTasks.habitsToday = normalize(action.userTasks.habits);
            }

            if (action.userTasks.toDo.length) {
                specificDayTasksState.userTasks.toDoToday = normalize(action.userTasks.toDo);
            }

            return specificDayTasksState;
        }
        case ADD_TASK: {
            // const addTaskState = { ...state };
            // deep copy because it is a nested object
            let addTaskState = JSON.stringify(state);
            addTaskState = JSON.parse(addTaskState);
            // console.log
            if (action.task.taskType === "Habit") {
                // addTaskState.userTasks = {...state, ...state.addTaskState.userTasks}
                addTaskState.userTasks.habitsToday = { ...state.userTasks.habitsToday, [action.task.id]: action.task };
                // console.log("ADD TASK STATE ===> ", addTaskState)
                return addTaskState;
            } else {
                // addTaskState.userTasks = {...state, ...state.addTaskState.userTasks}
                addTaskState.userTasks.toDoToday = { ...state.userTasks.toDoToday, [action.task.id]: action.task };
            }
            return addTaskState;
        }
        case DELETE_TASK: {
            const deleteTaskState = { ...state };
            // console.log("action.taskId", action.taskId, typeof action.taskId)
            delete deleteTaskState.userTasks[action.taskId];
            // console.log("DELETE TASK STATE >>>>>>>\n", deleteTaskState);
            return deleteTaskState;
        }
        case EDIT_TASK: {
            let editTaskState = JSON.stringify(state);
            editTaskState = JSON.parse(editTaskState);
            // console.log("action.taskId", action.taskId)
            // console.log("action.task", action.task)

            if (action.task.taskType === "Habit") {
                editTaskState.userTasks.habitsToday = { ...state.userTasks.habitsToday, [action.task.id]: action.task };
                return editTaskState;
            } else {
                const now = new Date();
                if (action.task.day === formatDate(now)) {
                    editTaskState.userTasks.toDoToday = { ...state.userTasks.toDoToday, [action.task.id]: action.task };
                } else {
                    editTaskState.userTasks.unfinishedToDo = { ...state.userTasks.unfinishedToDo, [action.task.id]: action.task }
                }
            }
            return editTaskState;
        }
        case EDIT_TASK_CATEGORY: {
            let editTaskCategoryState = JSON.stringify(state);
            editTaskCategoryState = JSON.parse(editTaskCategoryState);
            // console.log("action.taskId", action.taskType)
            // console.log("action.task", action.task)
            if (action.taskType === "Habit") {
                editTaskCategoryState.userTasks.habitsToday = { ...state.userTasks.habitsToday, ...action.task};
                return editTaskCategoryState;
            } else {
                editTaskCategoryState.userTasks.toDoToday = { ...state.userTasks.toDoToday, ...action.task };
                return editTaskCategoryState;
            }

        }
        case DELETE_TASK_CATEGORY: {
            const deleteTaskCategoryState = { ...state };
            // delete deleteTaskCategoryState.userTasks[action.taskId];

            for (let i = 0; i < action.deletedTaskIds.length; i++) {
                let iD = action.deletedTaskIds[i];

                if (action.taskType === "Habit") {
                    delete deleteTaskCategoryState.userTasks.habitsToday[iD];
                } else {
                    delete deleteTaskCategoryState.userTasks.toDoToday[iD];
                }
            }

            // if (action.taskType === "Habit") {
            //     for (let i = 0; i < action.deletedTaskIds.length; i++) {
            //         let iD = action.deletedTaskIds[i];
            //         delete deleteTaskCategoryState.userTasks.habitsToday[iD]
            //     }
            // }
            // console.log("DELETE TASK STATE >>>>>>>\n", deleteTaskCategoryState);
            return deleteTaskCategoryState;
        }
        case EDIT_CATEGORY_ORDER: {
            let editCatOrderState = JSON.stringify(state);
            editCatOrderState = JSON.parse(editCatOrderState);

            console.log("editCatOrderState ==>", editCatOrderState.userTasks.habitsToday);

            if (action.userTasks.habitsToday && action.userTasks.habitsToday.length) {
                editCatOrderState.userTasks.habitsToday = action.userTasks.habitsToday;
            }

            if (action.userTasks.toDoToday && action.userTasks.toDoToday.length) {
                editCatOrderState.userTasks.toDoToday = action.userTasks.toDoToday;
            }

            if (action.userTasks.unfinishedToDo && action.userTasks.unfinishedToDo.length) {
                editCatOrderState.userTasks.unfinishedToDo = action.userTasks.unfinishedToDo;
            }

            console.log("editCatOrderState after ==>\n", editCatOrderState);

            return editCatOrderState;
        }
        default:
            return state;
    }
}
