import type from "./types";
import { combineReducers, } from "redux";

const list = (state = {}, action) => {
    switch (action.type) {

        case type.GET_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.GET_SUBSCRIPTION_FAILURE:
            return {
                ...state,
                result: [],
                error: action.payload.error,
            }

        default:
            return state;
    }
}

export default combineReducers({
    list,
});