import { v4 as uuidv4 } from 'uuid';

export const _getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

export const _buildQueryString = (obj) => Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a }, []).join('&')

export const _buildQueryParams = (obj) => Object.keys(obj).reduce(function (a, k) { a.push(k + '/' + encodeURIComponent(obj[k])); return a }, []).join('')

export const _uuid = () => uuidv4()