import { all, put, takeLatest } from "redux-saga/effects";
import type from "./types";
import * as ac from "./actions";
import API from "../../utils/api";
var url = "/auth";

function* doLoginWorker(action) {
  const { payload } = action;
  try {
    const response = yield API('POST', `${url}/login`, payload);
    localStorage.setItem('tokenData', JSON.stringify(response.data[0]));
    yield put(ac.doLoginSuccess(response));
  } catch (e) {
    yield put(ac.doLoginFailure(e));
  }
}

function* doLoginWatcher() {
  yield takeLatest(`${type.DO_LOGIN_BEGIN}`, doLoginWorker)
}


function* doLogoutWorker(action) {
  const { payload } = action;
  try {
    const response = yield API('POST', `${url}/logout`, payload);
    localStorage.removeItem('tokenData');
    yield put(ac.doLogoutSuccess(response));
  } catch (e) {
    yield put(ac.doLogoutFailure(e));
  }
}

function* doLogoutWatcher() {
  yield takeLatest(`${type.DO_LOGOUT_BEGIN}`, doLogoutWorker)
}

export default function* authSaga() {
  yield all([
    doLoginWatcher(),
    doLogoutWatcher(),
  ])
}