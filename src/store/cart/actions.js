import type from "./types";

export const addToCartBegin = (data = []) => {
    return {
        type: type.ADD_TO_CART_BEGIN,
        payload: data
    };
};

export const addToCartSuccess = (data = []) => {
    return {
        type: type.ADD_TO_CART_SUCCESS,
        payload: data
    };
};

export const addToCartFailure = (data = []) => {
    return {
        type: type.ADD_TO_CART_FAILURE,
        payload: data
    };
};


export const getCartBegin = (data = []) => {
    return {
        type: type.GET_CART_BEGIN,
        payload: data
    };
};

export const getCartSuccess = (data = []) => {
    return {
        type: type.GET_CART_SUCCESS,
        payload: data
    };
};

export const getCartFailure = (data = []) => {
    return {
        type: type.GET_CART_FAILURE,
        payload: data
    };
};

export const updateCartProductBegin = (data = []) => {
    return {
        type: type.UPDATE_CART_PRODUCT_BEGIN,
        payload: data
    };
};

export const updateCartProductSuccess = (data = []) => {
    return {
        type: type.UPDATE_CART_PRODUCT_SUCCESS,
        payload: data
    };
};

export const updateCartProductFailure = (data = []) => {
    return {
        type: type.UPDATE_CART_PRODUCT_FAILURE,
        payload: data
    };
};

export const setQuantityUpBegin = (data = []) => {
    return {
        type: type.INCREASE_QUANTITY_BEGIN,
        payload: data
    };
};

export const setQuantityUpSuccess = (data = []) => {
    return {
        type: type.INCREASE_QUANTITY_SUCCESS,
        payload: data
    };
};

export const setQuantityUpFailure = (data = []) => {
    return {
        type: type.INCREASE_QUANTITY_FAILURE,
        payload: data
    };
};


export const setQuantityDownBegin = (data = []) => {
    return {
        type: type.DECREASE_QUANTITY_BEGIN,
        payload: data
    };
};

export const setQuantityDownSuccess = (data = []) => {
    return {
        type: type.DECREASE_QUANTITY_SUCCESS,
        payload: data
    };
};

export const setQuantityDownFailure = (data = []) => {
    return {
        type: type.DECREASE_QUANTITY_FAILURE,
        payload: data
    };
};

// SHIPPING [START]
export const setShippingBegin = (data = []) => {
    return {
        type: type.SET_SHIPPING_BEGIN,
        payload: data
    };
};

export const setShippingSuccess = (data = []) => {
    return {
        type: type.SET_SHIPPING_SUCCESS,
        payload: data
    };
};

export const setShippingFailure = (data = []) => {
    return {
        type: type.SET_SHIPPING_FAILURE,
        payload: data
    };
};
// SHIPPING [END]


// SUBSCRIPTION [START]
export const addSubscriptionBegin = (data = []) => {
    return {
        type: type.ADD_SUBSCRIPTION_BEGIN,
        payload: data
    };
};

export const addSubscriptionSuccess = (data = []) => {
    return {
        type: type.ADD_SUBSCRIPTION_SUCCESS,
        payload: data
    };
};

export const addSubscriptionFailure = (data = []) => {
    return {
        type: type.ADD_SUBSCRIPTION_FAILURE,
        payload: data
    };
};
// SUBSCRIPTION [END]


export const removeCartProductBegin = (data = []) => {
    return {
        type: type.REMOVE_CART_PRODUCT_BEGIN,
        payload: data
    };
};

export const removeCartProductSuccess = (data = []) => {
    return {
        type: type.REMOVE_CART_PRODUCT_SUCCESS,
        payload: data
    };
};

export const removeCartProductFailure = (data = []) => {
    return {
        type: type.REMOVE_CART_PRODUCT_FAILURE,
        payload: data
    };
};



export const getCartModeBegin = (data = []) => {
    return {
        type: type.GET_CART_MODE_BEGIN,
        payload: data
    };
};

export const getCartModeSuccess = (data = []) => {
    return {
        type: type.GET_CART_MODE_SUCCESS,
        payload: data
    };
};

export const getCartModeFailure = (data = []) => {
    return {
        type: type.GET_CART_MODE_FAILURE,
        payload: data
    };
};
