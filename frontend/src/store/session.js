import { csrfFetch } from "./csrf";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ADD_POINTS = "session/ADD_POINTS";

export const actionSetUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const actionRemoveUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const actionAddPoints = (user) => {
    return {
        type: ADD_POINTS,
        user
    }
}



// thunk action to login
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch(`/api/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            credential,
            password
        })
    })

    // if (res.ok) {
        const data = await res.json();
        // console.log("login - data:", data);
        dispatch(actionSetUser(data.user));
        return data;
    // }
}

// thunk action to restore user session
export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch(`/api/session`);
    const data = await res.json();
    // console.log("restoreUser - data:", data);
    dispatch(actionSetUser(data.user));
    return res;
}

// thunk action to signup
export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, email, password, birthday, displayPic } = user;

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birthday", birthday);

    if (displayPic) {
        formData.append("image", displayPic);
    }

    const res = await csrfFetch(`/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })

    const data = await res.json();
    // console.log("signup - data:", data);
    dispatch(actionSetUser(data));
    return res;
}

// thunk action to logout
export const logout = () => async (dispatch) => {
    const res = await csrfFetch(`/api/session`, {
        method: "DELETE"
    });

    dispatch(actionRemoveUser());

    return res;
}

export const addPoints = (pointsEarned) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/points`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pointsEarned)
    })

    if (res.ok) {
        const editedUser = await res.json();
        dispatch(actionAddPoints(editedUser));
        return editedUser;
    }
}

export const spendPoints = (pointsSpent) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/spend`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pointsSpent)
    })

    if (res.ok) {
        const editedUser = await res.json();
        dispatch(actionAddPoints(editedUser));
        return editedUser;
    }
}

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            const setUserState = { ...state };
            setUserState.user = action.user;
            // console.log("session.login", setUserState)
            return setUserState;
        };
        case REMOVE_USER: {
            const removeUserState = { ...state };
            removeUserState.user = null;
            return removeUserState;
        };
        case ADD_POINTS: {
            const addPointsState = { ...state }
            addPointsState.user = action.user;
            // console.log("sessionReducer - addPointsState:", editUserState);
            return addPointsState;
        }
        default:
            return state;
    }
}
