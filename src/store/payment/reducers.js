import type from "./types";
import { combineReducers, } from "redux";

const createSecurePay = (state = {}, action) => {

    switch (action.type) {

        case type.CREATE_SECURE_PAY_SUCCESS:
            return {
                ...state,
                result: action.payload,
                error: null
            };

        case type.CREATE_SECURE_PAY_FAILURE:
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

        case type.GET_PAYMENTS_SUCCESS:
            return {
                ...state,
                result: action.payload,
            };

        case type.GET_PAYMENTS_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };


        default:
            return state;
    }
}

const generateRefund = (state = {}, action) => {
    switch (action.type) {

        case type.GENERATE_REFUND_SUCCESS:
            return {
                ...state,
                result: action.payload,
                error: null
            };

        case type.GENERATE_REFUND_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };
        default:
            return state;
    }
}

const cancelAutoPay = (state = {}, action) => {
    switch (action.type) {

        case type.CANCEL_AUTO_PAY_SUCCESS:
            return {
                ...state,
                result: action.payload,
                error: null
            };

        case type.CANCEL_AUTO_PAY_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };
        default:
            return state;
    }
}


const doRecurringAuth = (state = {}, action) => {
    switch (action.type) {

        case type.RECURRING_AUTH_SUCCESS:
            return {
                ...state,
                result: action.payload,
                error: null
            };

        case type.RECURRING_AUTH_FAILURE:
            return {
                ...state,
                result: action.payload,
                error: action.payload.error,
            };
        default:
            return state;
    }
}

const doRecurringPay = (state = {}, action) => {
    switch (action.type) {

        case type.RECURRING_PAY_SUCCESS:
            return {
                ...state,
                result: action.payload,
                error: null
            };

        case type.RECURRING_PAY_FAILURE:
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
    createSecurePay,
    list,
    generateRefund,
    cancelAutoPay,
    doRecurringAuth,
    doRecurringPay,
});