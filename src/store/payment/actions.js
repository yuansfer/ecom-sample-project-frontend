import type from "./types";

export const createSecurePayBegin = (data = []) => {
    return {
        type: type.CREATE_SECURE_PAY_BEGIN,
        payload: data
    };
};

export const createSecurePaySuccess = (data = []) => {
    return {
        type: type.CREATE_SECURE_PAY_SUCCESS,
        payload: data
    };
};

export const createSecurePayFailure = (data = []) => {
    return {
        type: type.CREATE_SECURE_PAY_FAILURE,
        payload: data
    };
};

export const getPaymentsBegin = (data = []) => {
    return {
        type: type.GET_PAYMENTS_BEGIN,
        payload: data
    };
};

export const getPaymentsSuccess = (data = []) => {
    return {
        type: type.GET_PAYMENTS_SUCCESS,
        payload: data
    };
};

export const getPaymentsFailure = (data = []) => {
    return {
        type: type.GET_PAYMENTS_FAILURE,
        payload: data
    };
};

// REFUND [START]
export const generateRefundBegin = (data = []) => {
    return {
        type: type.GENERATE_REFUND_BEGIN,
        payload: data
    };
};

export const generateRefundSuccess = (data = []) => {
    return {
        type: type.GENERATE_REFUND_SUCCESS,
        payload: data
    };
};

export const generateRefundFailure = (data = []) => {
    return {
        type: type.GENERATE_REFUND_FAILURE,
        payload: data
    };
};
// REFUND [END]

// REVOKE [START]
export const cancelAutoPayBegin = (data = []) => {
    return {
        type: type.CANCEL_AUTO_PAY_BEGIN,
        payload: data
    };
};

export const cancelAutoPaySuccess = (data = []) => {
    return {
        type: type.CANCEL_AUTO_PAY_SUCCESS,
        payload: data
    };
};

export const cancelAutoPayFailure = (data = []) => {
    return {
        type: type.CANCEL_AUTO_PAY_FAILURE,
        payload: data
    };
};
// REVOKE [END]

// RECURRING AUTH [START]
export const recurringAuthBegin = (data = []) => {
    return {
        type: type.RECURRING_AUTH_BEGIN,
        payload: data
    };
};

export const recurringAuthSuccess = (data = []) => {
    return {
        type: type.RECURRING_AUTH_SUCCESS,
        payload: data
    };
};

export const recurringAuthFailure = (data = []) => {
    return {
        type: type.RECURRING_AUTH_FAILURE,
        payload: data
    };
};
// RECURRING AUTH [END]


// APPLY TOKEN [START]
export const applyTokenBegin = (data = []) => {
    return {
        type: type.APPLY_TOKEN_BEGIN,
        payload: data
    };
};

export const applyTokenSuccess = (data = []) => {
    return {
        type: type.APPLY_TOKEN_SUCCESS,
        payload: data
    };
};

export const applyTokenFailure = (data = []) => {
    return {
        type: type.APPLY_TOKEN_FAILURE,
        payload: data
    };
};
// APPLY TOKEN [END]

// RECURRING PAYMENT [START]
export const recurringPayBegin = (data = []) => {
    return {
        type: type.RECURRING_PAY_BEGIN,
        payload: data
    };
};

export const recurringPaySuccess = (data = []) => {
    return {
        type: type.RECURRING_PAY_SUCCESS,
        payload: data
    };
};

export const recurringPayFailure = (data = []) => {
    return {
        type: type.RECURRING_PAY_FAILURE,
        payload: data
    };
};
// RECURRING PAYMENT [END]