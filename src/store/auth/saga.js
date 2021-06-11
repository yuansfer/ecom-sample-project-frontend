import { all, put, takeLatest } from "redux-saga/effects";
import type from "./types";
import * as ac from "./actions";
import API from "../../utils/api";
import { _loginLocalStorage, _logoutLocalStorage } from "../../utils/helper";
var url = "/auth";

function* doLoginWorker(action) {
  const { payload } = action;
  try {
    const response = yield API('POST', `${url}/login`, payload);
    try {
      if (response && response.data[0] && (response.data[0].customerId || response.data[0].userId)) {

        /* Update all localStorage variables based on Authenticate */
        _loginLocalStorage({
          tokenData: JSON.stringify(response.data[0]),
          ...(response.data[0].customerId) && {
            customerId: response.data[0].customerId,
          },
          ...(response.data[0].userId) && {
            userId: response.data[0].userId,
          }
        });

        /* Replce guest user with Authenticate user in cart */
        const cartId = localStorage.getItem('cartId');
        if (cartId) {
          yield API('PUT', `/carts/${cartId}`, {
            customer_id: response.data[0].customerId
          });
        }

      }
    } catch (error) {
      yield put(ac.doLoginFailure(error));
    }
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
    /* Unset all localStorage variables */
    _logoutLocalStorage();
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