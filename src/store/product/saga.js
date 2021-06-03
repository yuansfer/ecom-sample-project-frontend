import { all, put, takeLatest } from "redux-saga/effects";
import type from "./types";
import * as ac from "./actions";
import API from "../../utils/api";
var url = "/products";

function* getProductsWorker() {
  try {
    const response = yield API('GET', url);

    if (response.success) {
      yield put(ac.getProductsSuccess(response));
    }
  } catch (e) {
    yield put(ac.getProductsFailure(e));
  }
}

function* getProductsWatcher() {
  yield takeLatest(`${type.GET_PRODUCTS_BEGIN}`, getProductsWorker)
}


function* getProductWorker(action) {
  const { payload: { id } } = action;
  try {

    const response = yield API('GET', `${url}/${id}`);
    if (response.success) {
      yield put(ac.getProductSuccess(response));
    }
  } catch (e) {
    yield put(ac.getProductFailure(e));
  }
}

function* getProductWatcher() {
  yield takeLatest(`${type.GET_PRODUCT_BEGIN}`, getProductWorker)
}

export default function* productSaga() {
  yield all([
    getProductsWatcher(),
    getProductWatcher(),
  ])
}