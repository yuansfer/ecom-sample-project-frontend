import type from "./types";

export const getSubscriptionBegin = (data = []) => {
    return {
        type: type.GET_SUBSCRIPTION_BEGIN,
        payload: data
    };
};

export const getSubscriptionSuccess = (data = []) => {
    return {
        type: type.GET_SUBSCRIPTION_SUCCESS,
        payload: data
    };
};

export const getSubscriptionFailure = (data = []) => {
    return {
        type: type.GET_SUBSCRIPTION_FAILURE,
        payload: data
    };
};