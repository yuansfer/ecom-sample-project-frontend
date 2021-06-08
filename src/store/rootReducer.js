import { combineReducers } from "redux";
import products from "./product/reducers";
import carts from "./cart/reducers";
import orders from "./order/reducers";
import subscriptions from "./subscription/reducers";
import payments from "./payment/reducers";
import auth from "./auth/reducers";

const rootReducer = combineReducers({
    products,
    carts,
    orders,
    subscriptions,
    payments,
    auth,
});

export default rootReducer;
