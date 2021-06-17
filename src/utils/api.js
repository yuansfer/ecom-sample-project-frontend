import axios from "axios";
import _ from 'lodash';
import store from '../store';
import { _logoutLocalStorage } from "../utils/helper";
import { _ROUTES } from "../constants/GlobalSetting";

const BASE_URL = process.env.REACT_APP_BACKEND_APP_URL;
const DEFAULT_HEADER = {
    'Content-Type': 'application/json',
};

const API = async (method = 'GET', endpoint, payload = {}, headers = DEFAULT_HEADER) => {
    return new Promise(async (resolve, reject) => {
        //console.log('BASE_URL + endpoint', BASE_URL + endpoint)
        const state = store.getState();
        var tokenData = _.get(state, 'auth.login.tokenData', '');

        axios({
            method: method,
            url: BASE_URL + endpoint,
            data: payload,
            headers: {
                ...headers,
                ...(tokenData && tokenData.tokenType && tokenData.token) && {
                    'Authorization': `${tokenData.tokenType} ${tokenData.token}`
                }
            },
        }).then(async (response) => {
            resolve(response.data)
        }).catch((error) => {
            if (error.response.status === 401) {
                _logoutLocalStorage()
                window.location.href = _ROUTES.LOGIN;
            } else {
                reject(error.response.data);
            }

        })
    })
}

export default API;