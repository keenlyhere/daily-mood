import { csrfFetch } from "./csrf";

const LOAD_USER_ACTIVES = "petBg/LOAD_USER_ACTIVES";
const LOAD_ALL_USER_ITEMS = "petBg/LOAD_ALL_USER_ITEMS";
const ADD_PET = "petBg/ADD_PET";
const ADD_BACKGROUND = "petBg/ADD_BACKGROUND";
const EDIT_PET_INFO = "petBg/EDIT_PET_INFO";
const EDIT_ACTIVE_PET = "petBg/EDIT_ACTIVE_PET";
const EDIT_ACTIVE_BG = "petBg/EDIT_ACTIVE_BG";
const DELETE_PET = "petBg/DELETE_PET";
const DELETE_BG = "petBg/DELETE_BG";

const normalize = (petBgs) => {
    const normalizedData = {};
    // console.log("petBgs ---", petBgs)
    petBgs.forEach(petBg => normalizedData[petBg.id] = petBg);
    // console.log("normalized --->", normalizedData);
    return normalizedData;
}

// action creators
export const actionLoadUserActives = (userId, actives) => {
    return {
        type: LOAD_USER_ACTIVES,
        userId,
        actives
    }
}

export const actionLoadAllUserItems = (userItems) => {
    return {
        type: LOAD_ALL_USER_ITEMS,
        userItems
    }
}

export const actionAddPet = (pet) => {
    return {
        type: ADD_PET,
        pet
    }
}

export const actionAddBg = (bg) => {
    return {
        type: ADD_BACKGROUND,
        bg
    }
}

export const actionEditPetInfo = (pet) => {
    return {
        type: EDIT_PET_INFO,
        pet
    }
}

export const actionEditActivePet = (pet) => {
    return {
        type: EDIT_ACTIVE_PET,
        pet
    }
}

export const actionEditActiveBg = (bg) => {
    return {
        type: EDIT_ACTIVE_BG,
        bg
    }
}

export const actionDeletePet = (petId) => {
    return {
        type: DELETE_PET,
        petId
    }
}

export const actionDeleteBg = (bgId) => {
    return {
        type: DELETE_BG,
        bgId
    }
}

// thunk actions
export const loadUserActives = (userId) => async (dispatch) => {
    const res = await csrfFetch("/api/petbg/current");

    if (res.ok) {
        const userActives = await res.json();
        // console.log("loadUserUserActives - userActives:", userActives);
        dispatch(actionLoadUserActives(userId, userActives));
        return userActives;
    }
}

export const loadAllUserItems = () => async (dispatch) => {
    const res = await csrfFetch("/api/petbg/current/all");

    if (res.ok) {
        const userItems = await res.json();
        dispatch(actionLoadAllUserItems(userItems));
        return userItems;
    }
}

export const addPet = (newPet) => async (dispatch) => {
    console.log("NEW PET ___", newPet)
    const res = await csrfFetch(`/api/petbg/pet`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPet)
    })

    if (res.ok) {
        const pet = await res.json();
        console.log("pet___", pet)
        dispatch(actionAddPet(pet));
        return pet;
    }
}

export const addBg = (newBg) => async (dispatch) => {
    const res = await csrfFetch(`/api/petbg/bg`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBg)
    })

    if (res.ok) {
        const bg = await res.json();
        dispatch(actionAddBg(bg));
        return bg;
    }
}

export const editPetInfo = (petId, pet) => async (dispatch) => {
    const res = await csrfFetch(`/api/petbg/pet/${petId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pet)
    })

    if (res.ok) {
        const editedPet = await res.json();
        dispatch(actionEditPetInfo(editedPet));
        return editedPet;
    }
}

export const editActivePet = (userId, petId) => async (dispatch) => {
    const res = await csrfFetch(`/api/petbg/pet/${userId}/${petId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (res.ok) {
        const editedActivePet = await res.json();
        console.log("editedActivePet ===>", editedActivePet);
        dispatch(actionEditActivePet(editedActivePet));
        return editedActivePet;
    }
}

export const editActiveBg = (userId, bgId) => async (dispatch) => {
    const res = await csrfFetch(`/api/petbg/bg/${userId}/${bgId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (res.ok) {
        const editedActiveBg = await res.json();
        console.log("editedActivePet ===>", editedActiveBg);
        dispatch(actionEditActiveBg(editedActiveBg));
        return editedActiveBg;
    }
}

export const deletePet = (petId) => async (dispatch) => {
    const res = await csrfFetch(`/api/petbg/pet/${petId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deletedPet = await res.json();
        // console.log("deletedPet:", deletedPet);
        dispatch(actionDeletePet(petId));
        return deletedPet;
    }
}

export const deleteBg = (bgId) => async (dispatch) => {
    const res = await csrfFetch(`/api/petbg/bg/${bgId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deletedBg = await res.json();
        // console.log("deletedBg:", deletedBg);
        dispatch(actionDeleteBg(bgId));
        return deletedBg;
    }
}

const initialState = {
    pets: {},
    backgrounds: {},
    activePet: {},
    activeBg: {}
}

export default function petBgReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_ACTIVES: {
            let userActivesState = JSON.stringify(state);
            userActivesState = JSON.parse(userActivesState);
            userActivesState.activePet = action.actives.activePet;
            userActivesState.activeBg = action.actives.activeBg;
            return userActivesState;
        }
        case LOAD_ALL_USER_ITEMS: {
            let allUserItemsState = JSON.stringify(state);
            allUserItemsState = JSON.parse(allUserItemsState);
            allUserItemsState.activePet = action.userItems.activePet;
            allUserItemsState.activeBg = action.userItems.activeBg;
            allUserItemsState.pets = normalize(action.userItems.pets);
            allUserItemsState.backgrounds = normalize(action.userItems.bgs);
            // console.log("alluseritemsstate:::::", allUserItemsState);
            return allUserItemsState;
        }
        case ADD_PET: {
            let addPetState = JSON.stringify(state);
            addPetState = JSON.parse(addPetState);
            addPetState.pets = { ...state.pets, [action.pet.id]: action.pet };
            return addPetState;
        }
        case ADD_BACKGROUND: {
            let addBgState = JSON.stringify(state);
            addBgState = JSON.parse(addBgState);
            addBgState.backgrounds = { ...state.backgrounds, [action.bg.id]: action.bg };
            return addBgState;
        }
        case EDIT_PET_INFO: {
            let editPetInfoState = JSON.stringify(state);
            editPetInfoState = JSON.parse(editPetInfoState);
            console.log("action *** ==>", action)
            editPetInfoState.activePet = action.pet;
            editPetInfoState.pets = { ...state.pets, [action.pet.id]: action.pet };
            console.log("EDIT PET INFO STATE ===>", editPetInfoState)
            return editPetInfoState;
        }
        case EDIT_ACTIVE_PET: {
            let editActivePetState = JSON.stringify(state);
            editActivePetState = JSON.parse(editActivePetState);
            editActivePetState.activePet = action.pet;
            return editActivePetState;
        }
        case EDIT_ACTIVE_BG: {
            let editActiveBgState = JSON.stringify(state);
            editActiveBgState = JSON.parse(editActiveBgState);
            editActiveBgState.activeBg = action.bg;
            console.log("EDIT ACTIVE BG STATE", editActiveBgState);
            return editActiveBgState;
        }
        case DELETE_PET: {
            const deletePetState = { ...state };
            delete deletePetState.pets[action.petId];
            return deletePetState;
        }
        case DELETE_BG: {
            const deleteBgState = { ...state };
            delete deleteBgState.backgrounds[action.bgId];
            return deleteBgState;
        }
        default:
            return state;
    }
}
