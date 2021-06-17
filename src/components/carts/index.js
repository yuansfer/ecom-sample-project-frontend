import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import _ from 'lodash';

import { getCartModeBegin } from "../../store/cart/actions";
import { _ROUTES, } from "../../constants/GlobalSetting";
import { setSessionId } from "../../utils/helper";


class Carts extends Component {

  constructor(props) {
    super(props);

    setSessionId()

    this.state = {
      sessionId: localStorage.getItem('sessionId'),
      customerId: localStorage.getItem('customerId'),
      mode: 'buy',
    };
  }

  componentDidMount() {
    const { customerId, sessionId } = this.state;
    if (customerId || sessionId) {
      this.props.getCartModeBegin({
        customer_id: customerId,
        session_id: sessionId
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { mode, history } = this.props;

    if (prevProps.mode !== mode) {
      const { result: { data, success } } = mode;
      if (success) {

        if (data && data.mode) {
          if (data.mode === 'subscribe') {
            history.push(_ROUTES.VIEW_SUBSCRIPTION)
          } else {
            history.push(_ROUTES.VIEW_CART)
          }
        } else {
          history.push(_ROUTES.VIEW_CART)
        }

      } else {
        history.push(_ROUTES.VIEW_CART)
      }
    }
  }


  render() {
    return (
      <>

      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mode: _.get(state, 'carts.mode', {}),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCartModeBegin: (payload) => dispatch(getCartModeBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Carts));