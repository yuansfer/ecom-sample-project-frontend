import type from "./types";
import { combineReducers, } from "redux";

let tokenData = null;
try {
    tokenData = JSON.parse(localStorage.getItem('tokenData'));
} catch (error) { }

const INIT_STATE = {
    tokenData: tokenData
};


const login = (state = INIT_STATE, action) => {
    switch (action.type) {

        case type.DO_LOGIN_SUCCESS:
            return {
                ...state,
                //loading: false,
                result: action.payload,
                error: null
            };

        case type.DO_LOGIN_FAILURE:
            return {
                ...state,
                //loading: false,
                result: [],
                error: action.payload.error,
            };
        default:
            return state;
    }
}

const logout = (state = {}, action) => {
    switch (action.type) {

        case type.DO_LOGOUT_SUCCESS:
            return {
                ...state,
                //loading: false,
                result: action.payload,
                error: null
            };

        case type.DO_LOGOUT_FAILURE:
            return {
                ...state,
                //loading: false,
                result: [],
                error: action.payload.error,
            };
        default:
            return state;
    }
}

export default combineReducers({
    login,
    logout,
});