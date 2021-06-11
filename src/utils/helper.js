import { v4 as uuidv4 } from 'uuid';

export const _getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

export const _buildQueryString = (obj) => Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a }, []).join('&')

export const _buildQueryParams = (obj) => Object.keys(obj).reduce(function (a, k) { a.push(k + '/' + encodeURIComponent(obj[k])); return a }, []).join('')

export const _uuid = () => uuidv4()

export const _isLoggedIn = () => {
    if (localStorage.getItem('tokenData') && localStorage.getItem('customerId')) {
        const { customerId } = JSON.parse(localStorage.getItem('tokenData'));
        return parseInt(localStorage.getItem('customerId')) === parseInt(customerId) ? true : false;
    } else {
        return false;
    }
}

export const _loginLocalStorage = ({ tokenData, customerId }) => {
    localStorage.setItem('tokenData', tokenData);
    localStorage.setItem('customerId', customerId);
    localStorage.removeItem('sessionId');
}

export const _logoutLocalStorage = () => {
    localStorage.removeItem('tokenData');
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
