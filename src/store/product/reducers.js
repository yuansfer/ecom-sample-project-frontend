import type from "./types";
import { combineReducers, } from "redux";

const list = (state = {}, action) => {
    switch (action.type) {
        case type.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                result: action.payload,
                error: null
            };

        case type.GET_PRODUCTS_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };
        default:
            return state;
    }
}

const search = (state = {}, action) => {
    switch (action.type) {

        case type.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                result: action.payload,
                error: null
            };

        case type.GET_PRODUCT_FAILURE:
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
    list,
    search,
});