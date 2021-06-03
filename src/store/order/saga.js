import { all, put, takeLatest } from "redux-saga/effects";
import type from "./types";
import * as ac from "./actions";
import API from "../../utils/api";
var url = "/orders";

function* getOrderWorker(action) {

  const { payload: { id } } = action;
  try {
    const response = yield API('GET', `${url}/${id}`);

    yield put(ac.getOrderSuccess(response));

  } catch (e) {
    yield put(ac.getOrderFailure(e));
  }
}

function* getOrderWatcher() {
  yield takeLatest(`${type.GET_ORDER_BEGIN}`, getOrderWorker)
}

function* getOrdersWorker(action) {

  const { payload: { customer_id, purchase_mode } } = action;

  let queryString = customer_id ? '?customer_id=' + customer_id : '';
  queryString += purchase_mode ? '&purchase_mode=' + purchase_mode : '';
  const newUrl = [url, queryString].join('/')

  try {
    const response = yield API('GET', newUrl);

    yield put(ac.getOrdersSuccess(response));

  } catch (e) {
    yield put(ac.getOrdersFailure(e));
  }
}

function* getOrdersWatcher() {
  yield takeLatest(`${type.GET_ORDERS_BEGIN}`, getOrdersWorker)
}

export default function* orderSaga() {
  yield all([
    getOrderWatcher(),
    getOrdersWatcher(),
  ])
}