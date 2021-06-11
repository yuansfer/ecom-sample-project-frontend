import { v4 as uuidv4 } from 'uuid';

export const _getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

export const _buildQueryString = (obj) => Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a }, []).join('&')

export const _buildQueryParams = (obj) => Object.keys(obj).reduce(function (a, k) { a.push(k + '/' + encodeURIComponent(obj[k])); return a }, []).join('')

export const _uuid = () => uuidv4()

export const _isLoggedIn = () => {
    var flag = false;
    if (localStorage.getItem('tokenData')) {
        const { customerId, userId } = JSON.parse(localStorage.getItem('tokenData'));
        if (localStorage.getItem('customerId')) {
            flag = parseInt(localStorage.getItem('customerId')) === parseInt(customerId) ? true : false;
        } else if (localStorage.getItem('userId')) {
            flag = parseInt(localStorage.getItem('userId')) === parseInt(userId) ? true : false;
        }
    }
    return flag;
}

export const _loginLocalStorage = ({ tokenData, customerId, userId }) => {
    localStorage.setItem('tokenData', tokenData);
    localStorage.setItem('userId', userId);
    customerId && localStorage.setItem('customerId', customerId);
    localStorage.removeItem('sessionId');
}

export const _logoutLocalStorage = () => {
    localStorage.removeItem('tokenData');
    localStorage.removeItem('userId');
    localStorage.removeItem('customerId');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('cartId');
    localStorage.removeItem('orderId');
}

export const _parseTokenData = (data) => {
    let parseData = null;
    try {

        if (data) {
            parseData = JSON.parse(data)
        } else if (localStorage.getItem('tokenData')) {
            parseData = JSON.parse(localStorage.getItem('tokenData'))
        }

    } catch (error) { }

    return parseData;
};

export const setSessionId = (data) => {
    if (!localStorage.getItem('customerId') && !localStorage.getItem('sessionId')) {
        localStorage.setItem('sessionId', _uuid())
    }
}

export const isCustomer = (data) => localStorage.getItem('customerId') && localStorage.getItem('userId')

export const isMerchant = (data) => !localStorage.getItem('customerId') && localStorage.getItem('userId')