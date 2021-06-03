import React, { Component } from 'react';
import { connect } from "react-redux";

import _ from 'lodash';

import { getCartModeBegin } from "../../store/cart/actions";
import { _ROUTES, } from "../../constants/GlobalSetting";

class Carts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      customerId: localStorage.getItem('customerId'),
      mode: 'buy',
    };
  }

  componentDidMount() {
    const { customerId } = this.state;
    if (customerId) {
      this.props.getCartModeBegin({ customer_id: customerId });
    }
  }

  componentDidUpdate(prevProps) {
    const { mode } = this.props;

    if (prevProps.mode !== mode) {
      const { result: { data, success } } = mode;
      if (success) {

        if (data && data.mode) {
          if (data.mode === 'subscribe') {
            this.props.history.push(_ROUTES.VIEW_SUBSCRIPTION)
          } else {
            this.props.history.push(_ROUTES.VIEW_CART)
          }
        } else {
          this.props.history.push(_ROUTES.VIEW_CART)
        }

      } else {
        this.props.history.push(_ROUTES.VIEW_CART)
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

export default connect(mapStateToProps, mapDispatchToProps)(Carts);