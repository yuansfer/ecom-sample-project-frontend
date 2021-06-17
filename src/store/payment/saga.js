import { all, put, takeLatest } from "redux-saga/effects";
import type from "./types";
import * as ac from "./actions";
import API from "../../utils/api";
var url = "/payments";

function* createSecurePayWorker(action) {

  const { payload } = action;
  try {
    const response = yield API('POST', url + '/secure-pay', payload);
    yield put(ac.createSecurePaySuccess(response));
  } catch (e) {
    yield put(ac.createSecurePayFailure(e));
  }
}

function* createSecurePayWatcher() {
  yield takeLatest(`${type.CREATE_SECURE_PAY_BEGIN}`, createSecurePayWorker)
}

function* getPaymentsWorker(action) {

  try {
    const response = yield API('GET', `${url}`);

    yield put(ac.getPaymentsSuccess(response));

  } catch (e) {
    yield put(ac.getPaymentsFailure(e));
  }
}

function* getPaymentsWatcher() {
  yield takeLatest(`${type.GET_PAYMENTS_BEGIN}`, getPaymentsWorker)
}

function* generateRefundWorker(action) {

  const { payload } = action;
  try {
    const response = yield API('POST', url + '/refund-request', payload);
    yield put(ac.generateRefundSuccess(response));

  } catch (e) {
    yield put(ac.generateRefundFailure(e));
  }
}

function* generateRefundWatcher() {
  yield takeLatest(`${type.GENERATE_REFUND_BEGIN}`, generateRefundWorker)
}


function* cancelAutoPayWorker(action) {

  const { payload } = action;
  try {
    const response = yield API('POST', url + '/revoke-auto-pay', payload);
    yield put(ac.cancelAutoPaySuccess(response));

  } catch (e) {
    yield put(ac.cancelAutoPayFailure(e));
  }
}

function* cancelAutoPayWatcher() {
  yield takeLatest(`${type.CANCEL_AUTO_PAY_BEGIN}`, cancelAutoPayWorker)
}


function* doRecurringAuthWorker(action) {

  const { payload } = action;
  try {
    const response = yield API('POST', url + '/authorize', payload);
    yield put(ac.recurringAuthSuccess(response));

  } catch (e) {
    yield put(ac.recurringAuthFailure(e));
  }
}

function* doRecurringAuthWatcher() {
  yield takeLatest(`${type.RECURRING_AUTH_BEGIN}`, doRecurringAuthWorker)
}


function* doRecurringPayWorker(action) {

  const { payload } = action;
  try {
    const response = yield API('POST', url + '/auto-debit-pay', payload);
    yield put(ac.recurringPaySuccess(response));

  } catch (e) {
    yield put(ac.recurringPayFailure(e));
  }
}

function* doRecurringPayWatcher() {
  yield takeLatest(`${type.RECURRING_PAY_BEGIN}`, doRecurringPayWorker)
}


function* applyTokenWorker(action) {

  const { payload } = action;
  try {
    const response = yield API('POST', url + '/apply-token', payload);
    yield put(ac.recurringAuthSuccess(response));

  } catch (e) {
    yield put(ac.recurringAuthFailure(e));
  }
}

function* applyTokenWatcher() {
  yield takeLatest(`${type.APPLY_TOKEN_BEGIN}`, applyTokenWorker)
}

export default function* paymentSaga() {
  yield all([
    createSecurePayWatcher(),
    getPaymentsWatcher(),
    generateRefundWatcher(),
    cancelAutoPayWatcher(),
    doRecurringAuthWatcher(),
    doRecurringPayWatcher(),
    applyTokenWatcher(),
  ])
}