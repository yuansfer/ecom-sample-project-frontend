import type from "./types";
import { combineReducers, } from "redux";
import _ from 'lodash';
import { _parseTokenData, } from "../../utils/helper";

let tokenData = _parseTokenData();

const INIT_STATE = {
    ...(tokenData) && {
        tokenData: tokenData,
    }
};

const login = (state = INIT_STATE, action) => {

    switch (action.type) {

        case type.DO_LOGIN_SUCCESS:
            return {
                ...state,
                result: action.payload,
                tokenData: _.get(action, 'payload.data[0]', {}),
                error: null
            };

        case type.DO_LOGIN_FAILURE:
            return {
                ...state,
                result: action.payload,
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
                result: action.payload,
                error: null
            };

        case type.DO_LOGOUT_FAILURE:
            return {
                ...state,
                result: action.payload,
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