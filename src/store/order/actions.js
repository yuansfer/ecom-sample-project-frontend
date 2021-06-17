import type from "./types";


export const getOrderBegin = (data = []) => {
    return {
        type: type.GET_ORDER_BEGIN,
        payload: data
    };
};

export const getOrderSuccess = (data = []) => {
    return {
        type: type.GET_ORDER_SUCCESS,
        payload: data
    };
};

export const getOrderFailure = (data = []) => {
    return {
        type: type.GET_ORDER_FAILURE,
        payload: data
    };
};

export const getOrdersBegin = (data = []) => {
    return {
        type: type.GET_ORDERS_BEGIN,
        payload: data
    };
};

export const getOrdersSuccess = (data = []) => {
    return {
        type: type.GET_ORDERS_SUCCESS,
        payload: data
    };
};

export const getOrdersFailure = (data = []) => {
    return {
        type: type.GET_ORDERS_FAILURE,
        payload: data
    };
};