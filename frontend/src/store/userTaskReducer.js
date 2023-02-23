import { csrfFetch } from "./csrf";

const LOAD_CURRENT_DAY_TASKS = "userTasks/LOAD_CURRENT_DAY_TASKS";
const LOAD_SPECIFIC_DAY_TASKS = "userTasks/LOAD_SPECIFIC_DAY_TASKS";
const ADD_TASK = "userTasks/ADD_TASK";
const EDIT_TASK = "userTasks/EDIT_TASK";
const DELETE_TASK = "userTasks/DELETE_TASK";

const normalize = (tasks) => {
    const normalizedData = {};
    if (!tasks.length) return tasks;
    tasks.forEach(task => normalizedData[task.id] = task);
    // console.log("NORMALIZED DATA ---", normalizedData)
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

export const actionAddTask = (task) => {
    return {
        type: ADD_TASK,
        task
    }
}

export const actionDeleteTask = (taskId) => {
    return {
        type: DELETE_TASK,
        taskId
    }
}

export const actionEditTask = (taskId, task) => {
    return {
        type: EDIT_TASK,
        taskId,
        task
    }
}

// thunk actions
export const loadCurrentDayTasks = (userId) => async (dispatch) => {
    const res = await csrfFetch("/api/tasks/current");

    if (res.ok) {
        const userTasks = await res.json();
        console.log("loadCurrentDay - userTasks:", userTasks);
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

export const addTask = (newEntry) => async (dispatch) => {
    const res = await csrfFetch(`/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntry)
    })

    if (res.ok) {
        const task = await res.json();
        console.log("addTask - task:", task);
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
        console.log("deletedTask - :", deletedTask);
        dispatch(actionDeleteTask(taskId));
        return deletedTask;
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
        console.log("editTask - editedTask:", editedTask);
        dispatch(actionEditTask(taskId, editedTask.task));
        return editedTask;
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

            if (action.userTasks.habitsToday.length) {
                userDayTasksState.userTasks.habitsToday = normalize(action.userTasks.habitsToday);
            }

            if (action.userTasks.toDoToday.length) {
                userDayTasksState.userTasks.toDoToday = normalize(action.userTasks.toDoToday);
            }

            if (action.userTasks.unfinishedToDo.length) {
                userDayTasksState.userTasks.unfinishedToDo = normalize(action.userTasks.unfinishedToDo);
            }

            console.log("LOAD_CURRENT_DAY_TASKS - userDayTasksState", action.userTasks);
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
            const addTaskState = { ...state };
            addTaskState.userTasks = { ...state.userTasks, [action.task.id]: action.task }
            // console.log("ADD_REVIEW - addReviewState:", addReviewState);
            return addTaskState;
        }
        case DELETE_TASK: {
            const deleteTaskState = { ...state };
            console.log("action.taskId", action.taskId, typeof action.taskId)
            delete deleteTaskState.userTasks[action.taskId];
            console.log("DELETE TASK STATE >>>>>>>\n", deleteTaskState);
            return deleteTaskState;
        }
        case EDIT_TASK: {
            const editTaskState = { ...state };
            console.log("action.taskId", action.taskId)
            console.log("action.task", action.task)
            editTaskState.userTasks = { ...state.userTasks, [action.taskId]: action.task };
            return editTaskState;
        }
        default:
            return state;
    }
}