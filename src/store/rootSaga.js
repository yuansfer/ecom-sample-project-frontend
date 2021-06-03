import { all } from "redux-saga/effects";
import productSaga from "./product/saga";
import cartSaga from "./cart/saga";
import orderSaga from "./order/saga";
import subscriptionSaga from "./subscription/saga";
import paymentSaga from "./payment/saga";

export default function* rootSaga() {
    yield all([
        productSaga(),
        cartSaga(),
        orderSaga(),
        subscriptionSaga(),
        paymentSaga(),
    ]);
}