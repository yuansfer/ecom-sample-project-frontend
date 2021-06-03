import type from "./types";

export const getProductsBegin = (data = []) => {
    return {
        type: type.GET_PRODUCTS_BEGIN,
        payload: data
    };
};

export const getProductsSuccess = (data = []) => {
    return {
        type: type.GET_PRODUCTS_SUCCESS,
        payload: data
    };
};

export const getProductsFailure = (data = []) => {
    return {
        type: type.GET_PRODUCTS_FAILURE,
        payload: data
    };
};

export const getProductBegin = (id = '') => {
    return {
        type: type.GET_PRODUCT_BEGIN,
        payload: id
    };
};

export const getProductSuccess = (data = []) => {
    return {
        type: type.GET_PRODUCT_SUCCESS,
        payload: data
    };
};

export const getProductFailure = (data = []) => {
    return {
        type: type.GET_PRODUCT_FAILURE,
        payload: data
    };
};