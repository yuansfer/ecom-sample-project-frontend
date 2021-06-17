import type from "./types";
import { combineReducers, } from "redux";

const create = (state = {}, action) => {
    switch (action.type) {

        case type.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.ADD_TO_CART_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };

        default:
            return state;
    }
}

const update = (state = {}, action) => {
    switch (action.type) {

        case type.UPDATE_CART_PRODUCT_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.UPDATE_CART_PRODUCT_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };

        default:
            return state;
    }
}

const remove = (state = {}, action) => {
    switch (action.type) {

        case type.REMOVE_CART_PRODUCT_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.REMOVE_CART_PRODUCT_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };

        default:
            return state;
    }
}


const list = (state = {}, action) => {
    switch (action.type) {

        case type.GET_CART_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.GET_CART_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };


        default:
            return state;
    }
}

const set_shipping = (state = {}, action) => {
    switch (action.type) {

        case type.SET_SHIPPING_SUCCESS:
            return {
                ...state,
                result: action.payload,
                error: null
            };

        case type.SET_SHIPPING_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };
        default:
            return state;
    }
}

const create_subscription = (state = {}, action) => {
    switch (action.type) {

        case type.ADD_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.ADD_SUBSCRIPTION_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };

        default:
            return state;
    }
}

const mode = (state = {}, action) => {
    switch (action.type) {

        case type.GET_CART_MODE_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.GET_CART_MODE_FAILURE:
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
    create,
    update,
    list,
    set_shipping,
    //increase_qty,
    //decrease_qty,
    create_subscription,
    remove,
    mode,
});