import { all, put, takeLatest } from "redux-saga/effects";
import type from "./types";
import * as ac from "./actions";
import API from "../../utils/api";
const url = "/carts";

function* addToCartWorker(action) {
  const { payload } = action;
  try {
    const response = yield API('POST', url, payload);
    yield put(ac.addToCartSuccess(response));

  } catch (e) {
    yield put(ac.addToCartFailure(e));
  }
}

function* addToCartWatcher() {
  yield takeLatest(`${type.ADD_TO_CART_BEGIN}`, addToCartWorker)
}

function* updateCartProductWorker(action) {
  const { payload } = action;
  const { cart_id, product_id } = payload
  const newUrl = [url, cart_id, 'product', product_id].join('/')

  try {
    const response = yield API('PUT', newUrl, payload);
    yield put(ac.updateCartProductSuccess(response));

  } catch (e) {
    yield put(ac.updateCartProductFailure(e));
  }
}

function* updateCartProductWatcher() {
  yield takeLatest(`${type.UPDATE_CART_PRODUCT_BEGIN}`, updateCartProductWorker)
}

function* getCartWorker(action) {

  const { payload: { id, purchase_mode } } = action;

  const queryString = purchase_mode ? '?purchase_mode=' + purchase_mode : '';
  const newUrl = [url, id, queryString].join('/')

  try {
    const response = yield API('GET', newUrl);

    yield put(ac.getCartSuccess(response));

  } catch (e) {
    yield put(ac.getCartFailure(e));
  }
}

function* getCartWatcher() {
  yield takeLatest(`${type.GET_CART_BEGIN}`, getCartWorker)
}

function* setShippingWorker(action) {
  const { payload } = action;
  const { cart_id } = payload;
  try {

    const response = yield API('PUT', `${url}/${cart_id}/shipping`, payload);

    yield put(ac.setShippingSuccess(response));

  } catch (e) {
    yield put(ac.setShippingFailure(e));
  }
}

function* setShippingWatcher() {
  yield takeLatest(`${type.SET_SHIPPING_BEGIN}`, setShippingWorker)
}


function* removeCartProductWorker(action) {
  const { payload: { id, cart_product_id } } = action;
  try {

    const response = yield API('DELETE', `${url}/${id}/cart-product/${cart_product_id}`);
    if (response.success) {
      yield put(ac.removeCartProductSuccess(response));
    }
  } catch (e) {
    yield put(ac.removeCartProductFailure(e));
  }
}

function* removeCartProductWatcher() {
  yield takeLatest(`${type.REMOVE_CART_PRODUCT_BEGIN}`, removeCartProductWorker)
}

function* addSubscriptionWorker(action) {

  const { payload } = action;
  try {
    const response = yield API('POST', url, payload);
    yield put(ac.addSubscriptionSuccess(response));

  } catch (e) {
    yield put(ac.addSubscriptionFailure(e));
  }
}

function* addSubscriptionWatcher() {
  yield takeLatest(`${type.ADD_SUBSCRIPTION_BEGIN}`, addSubscriptionWorker)
}

function* getCartModeWorker(action) {

  const { payload: { customer_id, session_id } } = action;

  var queryString = customer_id ? '?customer_id=' + customer_id : '';
  queryString += session_id ? '?session_id=' + session_id : '';
  const newUrl = [url, 'mode', queryString].join('/')

  try {
    const response = yield API('GET', newUrl);

    yield put(ac.getCartModeSuccess(response));

  } catch (e) {
    yield put(ac.getCartModeFailure(e));
  }
}

function* getCartModeWatcher() {
  yield takeLatest(`${type.GET_CART_MODE_BEGIN}`, getCartModeWorker)
}

export default function* cartSaga() {
  yield all([
    addToCartWatcher(),
    updateCartProductWatcher(),
    removeCartProductWatcher(),
    getCartWatcher(),
    setShippingWatcher(),
    addSubscriptionWatcher(),
    getCartModeWatcher(),
  ])
}