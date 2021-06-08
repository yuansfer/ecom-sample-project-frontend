import type from "./types";

export const doLoginBegin = (data = []) => {
    return {
        type: type.DO_LOGIN_BEGIN,
        payload: data
    };
};

export const doLoginSuccess = (data = []) => {
    return {
        type: type.DO_LOGIN_SUCCESS,
        payload: data
    };
};

export const doLoginFailure = (data = []) => {
    return {
        type: type.DO_LOGIN_FAILURE,
        payload: data
    };
};

export const doLogoutBegin = (data = []) => {
    return {
        type: type.DO_LOGOUT_BEGIN,
        payload: data
    };
};

export const doLogoutSuccess = (data = []) => {
    return {
        type: type.DO_LOGOUT_SUCCESS,
        payload: data
    };
};

export const doLogoutFailure = (data = []) => {
    return {
        type: type.DO_LOGOUT_FAILURE,
        payload: data
    };
};