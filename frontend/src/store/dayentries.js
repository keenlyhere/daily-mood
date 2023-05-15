import { csrfFetch } from "./csrf";

const LOAD_CURRENT_DAY = "dayEntries/LOAD_CURRENT_DAY";
const LOAD_SPECIFIC_DAY = "dayEntries/LOAD_SPECIFIC_DAY";
const LOAD_MONTHLY_MOODS = "dayEntries/LOAD_MONTHLY_MOODS";
const LOAD_SPECIFIC_MOODS = "dayEntries/LOAD_SPECIFIC_MOODS";
const ADD_DAY_ENTRY = "dayEntries/ADD_DAY_ENTRY";
const ADD_PAST_DAY_ENTRY = "dayEntries/ADD_PAST_DAY_ENTRY";
const EDIT_DAY_ENTRY = "dayEntries/EDIT_DAY_ENTRY";
const DELETE_DAY_ENTRY = "dayEntries/DELETE_DAY_ENTRY";

const normalize = (entries) => {
    const normalizedData = {};
    if (!entries.length) return entries;
    entries.forEach(entry => normalizedData[entry.id] = entry);
    // console.log("normalize - normalizedData:", normalizedData);
    return normalizedData;
}

const normalizeDays = (entries) => {
    const normalizedData = {};
    if (!entries.length) return entries;
    entries.forEach(entry => {
        const [ year, month, day ] = entry.day.split("-");
        const entryDate = new Date(year, month, day);
        // console.log("entry.day", entry);
        // console.log("entryDate", entryDate);
        // console.log("entry.getDate", entryDate.getDate());
        normalizedData[entryDate.getDate()] = entry;
    });
    // console.log("normalizedData", normalizedData)
    return normalizedData;
}

// action creators
export const actionLoadCurrentDay = (userId, dayEntries) => {
    return {
        type: LOAD_CURRENT_DAY,
        userId,
        dayEntries
    }
}

export const actionLoadSpecificDay = (userId, dayEntries) => {
    return {
        type: LOAD_SPECIFIC_DAY,
        userId,
        dayEntries
    }
}

export const actionLoadMonthlyMoods = (monthlyMoods) => {
    return {
        type: LOAD_MONTHLY_MOODS,
        monthlyMoods
    }
}

export const actionLoadSpecificMoods = (specificMoods) => {
    return {
        type: LOAD_SPECIFIC_MOODS,
        specificMoods
    }
}

export const actionAddDayEntry = (dayEntry) => {
    return {
        type: ADD_DAY_ENTRY,
        dayEntry
    }
}

export const actionDeleteDayEntry = (entryId) => {
    return {
        type: DELETE_DAY_ENTRY,
        entryId
    }
}

export const actionEditDayEntry = (entryId, dayEntry) => {
    return {
        type: EDIT_DAY_ENTRY,
        entryId,
        dayEntry
    }
}

// thunk actions
export const loadCurrentDay = (userId) => async (dispatch) => {
    const res = await csrfFetch("/api/day/current");

    if (res.ok) {
        const dayEntries = await res.json();
        // console.log("loadCurrentDay - dayEntries:", dayEntries.dayEntries);
        dispatch(actionLoadCurrentDay(userId, dayEntries.dayEntries));
        return dayEntries;
    }
}

export const loadSpecificDay = (userId, date) => async (dispatch) => {
    const res = await csrfFetch(`/api/day/${date}`);

    if (res.ok) {
        const entries = await res.json();
        // console.log("loadSpecificDay - entries:", entries);
        dispatch(actionLoadSpecificDay(userId, entries.dayEntries));
        return entries;
    }
}

export const loadMonthlyMoods = (year, month, mood) => async (dispatch) => {

    let res;

    if (mood) {
        res = await csrfFetch(`/api/day/moods/${year}/${month}?mood=${mood}`)
    } else {
        res = await csrfFetch(`/api/day/moods/${year}/${month}`);
    }

    if (res.ok) {
        const monthlyMoods = await res.json();
        // console.log("loadMonthlyMoods ===>", monthlyMoods);
        dispatch(actionLoadMonthlyMoods(monthlyMoods));
        return monthlyMoods;
    }
}

// export const loadSpecificMoods = (year, month, mood) => async (dispatch) => {
//     const res = await csrfFetch(`/api/day/moods/${year}/${month}?mood=${mood}`);

//     if (res.ok) {
//         const queriedMoods = await res.json();
//         console.log("queriedMoods", queriedMoods);
//         dispatch(actionLoadSpecificMoods(queriedMoods));
//         return queriedMoods;
//     }
// }

export const addDayEntry = (newEntry) => async (dispatch) => {
    const { entryType, entryData } = newEntry;
    const formData = new FormData();

    formData.append("entryType", entryType);

    if (entryType === "dayImage") {
        formData.append("image", entryData);
    } else {
        formData.append("entryData", entryData);
    }

    const res = await csrfFetch(`/api/day`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })

    if (res.ok) {
        const entry = await res.json();
        // console.log("addDayEntry - entry:", entry);
        dispatch(actionAddDayEntry(entry.dayEntry));
        return entry;
    }
}

export const addPastDayEntry = (newEntry, date) => async (dispatch) => {
    const { entryType, entryData } = newEntry;
    const formData = new FormData();

    formData.append("entryType", entryType);

    if (entryType === "dayImage") {
        formData.append("image", entryData);
    } else {
        formData.append("entryData", entryData);
    }

    const res = await csrfFetch(`/api/day/${date}`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })

    if (res.ok) {
        const entry = await res.json();
        // console.log("addDayEntry - entry:", entry);
        dispatch(actionAddDayEntry(entry.dayEntry));
        return entry;
    }
}

export const deleteDayEntry = (entryId) => async (dispatch) => {
    const res = await csrfFetch(`/api/day/${entryId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deletedDayEntry = await res.json();
        // console.log("deletedDayEntry - :", deletedDayEntry);
        dispatch(actionDeleteDayEntry(entryId));
        return deletedDayEntry;
    }
}

export const editDayEntry = (entryId, entry) => async (dispatch) => {

    const { entryType, entryData } = entry;
    const formData = new FormData();

    formData.append("entryType", entryType);

    if (entryType === "dayImage") {
        formData.append("image", entryData);
    } else {
        formData.append("entryData", entryData);
    }

    const res = await csrfFetch(`/api/day/${entryId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })

    if (res.ok) {
        const editedEntry = await res.json();
        // console.log("editEntry - editedEntry:", editedEntry);
        dispatch(actionEditDayEntry(entryId, editedEntry.dayEntry));
        return editedEntry;
    }
}

const initialState = {
    dayEntries: {}
}
export default function dayEntriesReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CURRENT_DAY: {
            const userDayEntriesState = { ...state };
            userDayEntriesState.dayEntries = normalize(action.dayEntries);
            // console.log("LOAD_CURRENT_DAY - userDayEntriesState", userDayEntriesState);
            return userDayEntriesState;
        }
        case LOAD_SPECIFIC_DAY: {
            const specificDayEntriesState = { ...state };
            specificDayEntriesState.dayEntries = normalize(action.dayEntries);
            return specificDayEntriesState;
        }
        case LOAD_MONTHLY_MOODS: {
            let monthlyMoodsState = JSON.stringify(state);
            monthlyMoodsState = JSON.parse(monthlyMoodsState);
            monthlyMoodsState.monthlyMoods = normalizeDays(action.monthlyMoods.monthlyMoods);
            // console.log("monthlyMoodsState ===> ", monthlyMoodsState);
            return monthlyMoodsState;
        }
        case LOAD_SPECIFIC_MOODS: {
            let specificMoodsState = JSON.stringify(state);
            specificMoodsState = JSON.parse(specificMoodsState);
            specificMoodsState.monthlyMoods = normalizeDays(action.specificMoods.monthlyMoods);
            // console.log("specificMoodsState ===>", specificMoodsState);
            return specificMoodsState;
        }
        case ADD_DAY_ENTRY: {
            let addDayEntryState = JSON.stringify(state);
            addDayEntryState = JSON.parse(addDayEntryState)
            addDayEntryState.dayEntries = { ...state.dayEntries, [action.dayEntry.id]: action.dayEntry }
            // console.log("ADD_DAY_ENTRY - addDayEntryState:", addDayEntryState);
            return addDayEntryState;
        }
        case DELETE_DAY_ENTRY: {
            const deleteDayEntryState = { ...state };
            // console.log("action.entryId", action.entryId, typeof action.entryId)
            // console.log("DELETE DAY ENTRY STATE >>>>>>>\n", deleteDayEntryState);
            delete deleteDayEntryState.dayEntries[+action.entryId];
            // console.log("DELETE DAY ENTRY STATE >>>>>>>\n", deleteDayEntryState);
            return deleteDayEntryState;
        }
        case EDIT_DAY_ENTRY: {
            const editEntryState = { ...state };
            // console.log("action.entryId", action.entryId)
            // console.log("action.dayEntry", action.dayEntry)
            editEntryState.dayEntries = { ...state.dayEntries, [action.entryId]: action.dayEntry };
            return editEntryState;
        }
        default:
            return state;
    }
}
