import './App.css';

import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { _ROUTES } from "./constants/GlobalSetting";

import Header from './components/common/Header';
import Footer from './components/common/Footer';

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

const App = () => (
  <Container>
    <Row>
      <Col>
        <Header />
        <BrowserRouter>

          <Switch>
            <Route exact path="/"><Redirect to={_ROUTES.PRODUCTS_LIST} /></Route> {/* Default Route */}
            <Route exact path={_ROUTES.PRODUCTS_LIST} component={ProductsList} />
            <Route exact path={_ROUTES.VIEW_PRODUCT} component={ProductView} />

            <Route exact path={_ROUTES.CARTS_LIST} component={CartsList} />

            <Route exact path={_ROUTES.VIEW_CART} component={CartList} />
            <Route exact path={_ROUTES.INFORMATION} component={CartInformation} />
            <Route exact path={_ROUTES.CART_PAYMENT} component={CartPayment} />

            <Route exact path={_ROUTES.VIEW_SUBSCRIPTION} component={SubscriptionList} />
            <Route exact path={_ROUTES.SUBSCRIPTION_INFORMATION} component={SubscriptionInformation} />
            <Route exact path={_ROUTES.SUBSCRIPTION_PAYMENT} component={SubscriptionPayment} />

            <Route exact path={_ROUTES.CART_PAYMENT_SUCCESS} component={PaymentSuccess} />
            <Route exact path={_ROUTES.CART_PAYMENT_DECLINE} component={PaymentDeclined} />

            <Route exact path={_ROUTES.SUBSCRIBE_PAYMENT_SUCCESS} component={SubscribePaymentSuccess} />
            <Route exact path={_ROUTES.SUBSCRIBE_PAYMENT_DECLINE} component={SubscribePaymentDecline} />

            <Route exact path={_ROUTES.PAYMENT_REFUND_CANCEL} component={RefundCancel} />
            <Route exact path={_ROUTES.CUSTOMER_SUBSCRIPTION} component={CustomerSubscriptionsList} />

            {/* <Route component={Error} /> */}
          </Switch>
        </BrowserRouter>

        <Footer />
      </Col>
    </Row>
  </Container>
);

export default App;