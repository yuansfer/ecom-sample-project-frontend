
import React, { Component } from 'react'
import { connect } from "react-redux";

import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import './App.css';

import { _ROUTES } from "./constants/GlobalSetting";

import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute'

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Login from './components/auth/login';

// PRODUCT ROUTES
import ProductsList from "./components/products/ProductsList";
import ProductView from "./components/products/ProductView";

import CartsList from "./components/carts/index";

// ADD TO CART ROUTES
import CartList from "./components/carts/CartList";
import CartInformation from "./components/carts/CartInformation";
import CartPayment from "./components/carts/CartPayment";

// SUBSCRIBE ROUTES
import SubscriptionList from "./components/subscriptions/SubscriptionList";
import SubscriptionInformation from "./components/subscriptions/SubscriptionInformation";
import SubscriptionPayment from "./components/subscriptions/SubscriptionPayment";

// CART PAYMENT ROUTES
import PaymentSuccess from "./components/payments/PaymentSuccess";
import PaymentDeclined from "./components/payments/PaymentDeclined";

// SUBSCRIBE PAYMENT ROUTES
import SubscribePaymentSuccess from "./components/payments/SubscribePaymentSuccess";
import SubscribePaymentDecline from "./components/payments/SubscribePaymentDecline";

// REFUND -CANCEL [FOR MERCHANT USE ONLY]
import RefundCancel from "./components/payments/RefundCancel";

// CUSTOMER SUBSCRIPTION ROUTES
import CustomerSubscriptionsList from "./components/customers/CustomerSubscriptionsList";

import { doLogoutBegin } from "./store/auth/actions";
import { _isLoggedIn, } from "../src/utils/helper";

class App extends Component {

  componentDidMount() {
    window.addEventListener('storage', e => {
      if (e.key === 'tokenData' && e.oldValue && !e.newValue) {
        this.props.doLogoutBegin()
      }
    });
  }

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <BrowserRouter>
                <Header />
                <Switch>

                  {/* Default Route */}
                  <Route exact path="/"><Redirect to={_ROUTES.PRODUCTS_LIST} /></Route>

                  {/* Auth Routes */}
                  <PublicRoute restricted={_isLoggedIn() ? true : false} path={_ROUTES.LOGIN} component={Login} exact />

                  {/* Products Routes */}
                  <PublicRoute restricted={false} path={_ROUTES.PRODUCTS_LIST} component={ProductsList} exact />
                  <PublicRoute restricted={false} path={_ROUTES.VIEW_PRODUCT} component={ProductView} exact />

                  {/* Cart Routes */}
                  <PublicRoute restricted={false} path={_ROUTES.CARTS_LIST} component={CartsList} exact />
                  <PublicRoute restricted={false} path={_ROUTES.VIEW_CART} component={CartList} exact />
                  <PublicRoute restricted={false} path={_ROUTES.CART_SHIPPING} component={CartInformation} exact />

                  {/* Cart Payment Routes */}
                  <PrivateRoute path={_ROUTES.CART_PAYMENT} component={CartPayment} exact />
                  {/* [OR] */}
                  {/* <Route exact path={_ROUTES.CART_PAYMENT} component={CartPayment} /> */}
                  <PrivateRoute path={_ROUTES.CART_PAYMENT_SUCCESS} component={PaymentSuccess} exact />
                  <PrivateRoute path={_ROUTES.CART_PAYMENT_DECLINE} component={PaymentDeclined} exact />

                  {/* Subscription Routes */}
                  <PublicRoute restricted={false} path={_ROUTES.VIEW_SUBSCRIPTION} component={SubscriptionList} exact />
                  <PublicRoute restricted={false} path={_ROUTES.SUBSCRIPTION_SHIPPING} component={SubscriptionInformation} exact />

                  {/* Subscription Payment Routes */}
                  <PrivateRoute path={_ROUTES.SUBSCRIPTION_PAYMENT} component={SubscriptionPayment} exact />
                  {/* [OR] */}
                  {/* <Route exact path={_ROUTES.SUBSCRIPTION_PAYMENT} component={SubscriptionPayment} /> */}
                  <PrivateRoute path={_ROUTES.SUBSCRIBE_PAYMENT_SUCCESS} component={SubscribePaymentSuccess} exact />
                  <PrivateRoute path={_ROUTES.SUBSCRIBE_PAYMENT_DECLINE} component={SubscribePaymentDecline} exact />

                  {/* Customer Routes */}
                  <PrivateRoute path={_ROUTES.CUSTOMER_SUBSCRIPTION} component={CustomerSubscriptionsList} exact />

                  {/* Merchant Routes */}
                  <PrivateRoute path={_ROUTES.PAYMENT_REFUND_CANCEL} component={RefundCancel} exact />



                  {/* <Route exact path="/"><Redirect to={_ROUTES.PRODUCTS_LIST} /></Route>
            <Route exact path={_ROUTES.LOGIN} component={Login} />

            <Route exact path={_ROUTES.PRODUCTS_LIST} component={ProductsList} />
            <Route exact path={_ROUTES.VIEW_PRODUCT} component={ProductView} />

            <Route exact path={_ROUTES.CARTS_LIST} component={CartsList} />

            <Route exact path={_ROUTES.VIEW_CART} component={CartList} />
            <Route exact path={_ROUTES.CART_SHIPPING} component={CartInformation} />
            <Route exact path={_ROUTES.CART_PAYMENT} component={CartPayment} />

            <Route exact path={_ROUTES.VIEW_SUBSCRIPTION} component={SubscriptionList} />
            <Route exact path={_ROUTES.SUBSCRIPTION_SHIPPING} component={SubscriptionInformation} />
            <Route exact path={_ROUTES.SUBSCRIPTION_PAYMENT} component={SubscriptionPayment} />

            <Route exact path={_ROUTES.CART_PAYMENT_SUCCESS} component={PaymentSuccess} />
            <Route exact path={_ROUTES.CART_PAYMENT_DECLINE} component={PaymentDeclined} />

            <Route exact path={_ROUTES.SUBSCRIBE_PAYMENT_SUCCESS} component={SubscribePaymentSuccess} />
            <Route exact path={_ROUTES.SUBSCRIBE_PAYMENT_DECLINE} component={SubscribePaymentDecline} />

            <Route exact path={_ROUTES.PAYMENT_REFUND_CANCEL} component={RefundCancel} />
            <Route exact path={_ROUTES.CUSTOMER_SUBSCRIPTION} component={CustomerSubscriptionsList} /> */}

                </Switch>
                <Footer />
              </BrowserRouter>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logout: _.get(state, 'auth.logout', {}),
  };
};

const mapDispatchToProps = (dispatch) => ({
  doLogoutBegin: () => dispatch(doLogoutBegin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


// const App = () => (
//   <Container>
//     <Row>
//       <Col>
//         <BrowserRouter>
//           <Header />
//           <Switch>

//             {/* Default Route */}
//             <Route exact path="/"><Redirect to={_ROUTES.PRODUCTS_LIST} /></Route>

//             {/* Auth Routes */}
//             <PublicRoute restricted={false} path={_ROUTES.LOGIN} component={Login} exact />

//             {/* Products Routes */}
//             <PublicRoute restricted={false} path={_ROUTES.PRODUCTS_LIST} component={ProductsList} exact />
//             <PublicRoute restricted={false} path={_ROUTES.VIEW_PRODUCT} component={ProductView} exact />

//             {/* Cart Routes */}
//             <PublicRoute restricted={false} path={_ROUTES.CARTS_LIST} component={CartsList} exact />
//             <PublicRoute restricted={false} path={_ROUTES.VIEW_CART} component={CartList} exact />
//             <PublicRoute restricted={false} path={_ROUTES.CART_SHIPPING} component={CartInformation} exact />

//             {/* Cart Payment Routes */}
//             {/* <PrivateRoute path={_ROUTES.CART_PAYMENT} component={CartPayment} exact /> */}
//             {/* [OR] */} <Route exact path={_ROUTES.CART_PAYMENT} component={CartPayment} />
//             <PrivateRoute path={_ROUTES.CART_PAYMENT_SUCCESS} component={PaymentSuccess} exact />
//             <PrivateRoute path={_ROUTES.CART_PAYMENT_DECLINE} component={PaymentDeclined} exact />

//             {/* Subscription Routes */}
//             <PublicRoute restricted={false} path={_ROUTES.VIEW_SUBSCRIPTION} component={SubscriptionList} exact />
//             <PublicRoute restricted={false} path={_ROUTES.SUBSCRIPTION_SHIPPING} component={SubscriptionInformation} exact />

//             {/* Subscription Payment Routes */}
//             {/* <PrivateRoute path={_ROUTES.SUBSCRIPTION_PAYMENT} component={SubscriptionPayment} exact /> */}
//             {/* [OR] */} <Route exact path={_ROUTES.SUBSCRIPTION_PAYMENT} component={SubscriptionPayment} />
//             <PrivateRoute path={_ROUTES.SUBSCRIBE_PAYMENT_SUCCESS} component={SubscribePaymentSuccess} exact />
//             <PrivateRoute path={_ROUTES.SUBSCRIBE_PAYMENT_DECLINE} component={SubscribePaymentDecline} exact />

//             {/* Customer Routes */}
//             <PrivateRoute path={_ROUTES.CUSTOMER_SUBSCRIPTION} component={CustomerSubscriptionsList} exact />

//             {/* Merchant Routes */}
//             <PrivateRoute path={_ROUTES.PAYMENT_REFUND_CANCEL} component={RefundCancel} exact />


//             {/* <Route exact path="/"><Redirect to={_ROUTES.PRODUCTS_LIST} /></Route>
//             <Route exact path={_ROUTES.LOGIN} component={Login} />

//             <Route exact path={_ROUTES.PRODUCTS_LIST} component={ProductsList} />
//             <Route exact path={_ROUTES.VIEW_PRODUCT} component={ProductView} />

//             <Route exact path={_ROUTES.CARTS_LIST} component={CartsList} />

//             <Route exact path={_ROUTES.VIEW_CART} component={CartList} />
//             <Route exact path={_ROUTES.CART_SHIPPING} component={CartInformation} />
//             <Route exact path={_ROUTES.CART_PAYMENT} component={CartPayment} />

//             <Route exact path={_ROUTES.VIEW_SUBSCRIPTION} component={SubscriptionList} />
//             <Route exact path={_ROUTES.SUBSCRIPTION_SHIPPING} component={SubscriptionInformation} />
//             <Route exact path={_ROUTES.SUBSCRIPTION_PAYMENT} component={SubscriptionPayment} />

//             <Route exact path={_ROUTES.CART_PAYMENT_SUCCESS} component={PaymentSuccess} />
//             <Route exact path={_ROUTES.CART_PAYMENT_DECLINE} component={PaymentDeclined} />

//             <Route exact path={_ROUTES.SUBSCRIBE_PAYMENT_SUCCESS} component={SubscribePaymentSuccess} />
//             <Route exact path={_ROUTES.SUBSCRIBE_PAYMENT_DECLINE} component={SubscribePaymentDecline} />

//             <Route exact path={_ROUTES.PAYMENT_REFUND_CANCEL} component={RefundCancel} />
//             <Route exact path={_ROUTES.CUSTOMER_SUBSCRIPTION} component={CustomerSubscriptionsList} /> */}

//           </Switch>
//           <Footer />
//         </BrowserRouter>
//       </Col>
//     </Row>
//   </Container>
// );

// export default App;