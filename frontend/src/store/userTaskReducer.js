import { csrfFetch } from "./csrf";

const LOAD_CURRENT_TASKS = "userTasks/LOAD_CURRENT_TASKS";
const LOAD_SPECIFIC_DAY_TASKS = "userTasks/LOAD_SPECIFIC_DAY_TASKS";
const ADD_TASK = "userTasks/ADD_TASK";
const EDIT_TASK = "userTasks/EDIT_TASK";
const DELETE_TASK = "userTasks/DELETE_TASK";

const normalize = (entries) => {
    const normalizedData = {};
    if (!entries.length) return entries;
    entries.forEach(entry => normalizedData[entry.id] = entry);
    console.log("normalize - normalizedData:", normalizedData);
    return normalizedData;
}
