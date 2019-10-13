import {stopSubmit, change} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_IS_LOADING = 'SET_IS_LOADING';

let initialState = {
    userId: null,
    isAuth: false,
    isLoading: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, isAuth) => ({
    type: SET_USER_DATA, payload:
        {userId, isAuth}
});

export const login = (username, password) => {

    return (dispatch) => {
        if (username === 'Admin' && password === '12345') {
            dispatch(setAuthUserData(1, true));
        } else {
            dispatch(change('login', 'password', ''))
            dispatch(stopSubmit("login", {_error: 'Имя пользователя или пароль введены не верно.'}));
        }
    }
}

export const logout = () => async (dispatch) => {
    dispatch(setAuthUserData(null, false));
}

export default authReducer;