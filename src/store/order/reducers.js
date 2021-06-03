import type from "./types";
import { combineReducers, } from "redux";

const get = (state = {}, action) => {
    switch (action.type) {

        case type.GET_ORDER_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.GET_ORDER_FAILURE:
            return {
                ...state,
                result: [],
                error: action.payload.error,
            };

        default:
            return state;
    }
}


const list = (state = {}, action) => {
    switch (action.type) {

        case type.GET_ORDERS_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.GET_ORDERS_FAILURE:
            return {
                ...state,
                result: [],
                error: action.payload.error,
            };


        default:
            return state;
    }
}

export default combineReducers({
    get,
    list,
});