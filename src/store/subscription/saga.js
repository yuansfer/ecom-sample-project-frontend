import { all, put, takeLatest } from "redux-saga/effects";
import type from "./types";
import * as ac from "./actions";
import API from "../../utils/api";
var url = "/subscriptions";

function* getSubscriptionWorker() {
  try {
    const response = yield API('GET', url);
    yield put(ac.getSubscriptionSuccess(response));

  } catch (e) {
    yield put(ac.getSubscriptionFailure(e));
  }
}

function* getSubscriptionWatcher() {
  yield takeLatest(`${type.GET_SUBSCRIPTION_BEGIN}`, getSubscriptionWorker)
}

export default function* subscriptionSaga() {
  yield all([
    getSubscriptionWatcher(),
  ])
}