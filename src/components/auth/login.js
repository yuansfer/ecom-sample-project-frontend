import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import _ from 'lodash';
import { doLoginBegin } from "../../store/auth/actions";
import { isMerchant } from "../../utils/helper";
import { _ROUTES } from "../../constants/GlobalSetting";

class Login extends Component {

  state = {
    formValues: {
      username: "",
      password: "",
    },
    formErrors: {
      username: "",
      password: "",
    },
    formValidity: {
      username: false,
      password: false,
    },
    showError: false,
    errorMessage: '',
  }

  componentDidUpdate(prevProps) {
    const { login, history } = this.props;
    if (prevProps.login !== login) {
      const { result: { success, message } } = login;
      if (success) {
        if (isMerchant()) {
          history.push(_ROUTES.PAYMENT_REFUND_CANCEL);
        } else {
          history.goBack();
        }

      } else {
        this.setState({
          showError: true,
          errorMessage: message,
        })
      }
    }
  }

  _handleChange = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this._handleValidation({ name: target.name, value: target.value, });
  };

  _handleValidation = target => {

    let { name, value, checked } = target;

    value = (typeof checked !== "undefined" && !checked) ? "" : value;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;

    validity[name] = value && value.length > 0 ? true : false;

    if (name) {
      fieldValidationErrors[name] = !validity[name] ? `Please enter ${name}` : ""
    }

    if (validity[name]) {
      // For advance validation
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };

  _handleSubmit = event => {
    event.preventDefault();
    const { formValues, formValidity, } = this.state;

    if (Object.values(formValidity).every(Boolean)) {
      this.props.doLoginBegin({
        username: formValues.username,
        password: formValues.password,
      })

    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this._handleValidation(target);
      }
    }
  }

  _onHide = ({ showError }) => {
    this.setState({ showError })
  }

  render() {
    const { formErrors, showError, errorMessage } = this.state;

    return (
      <>
        <main>
          <section className={"checkout_area section-padding buy-product"}>
            <div className={"container"}>

              <div className={"row justify-content-center"}>
                <div className={"col-xl-7 col-lg-8 col-md-10"}>
                  <div className={"section-tittle mb-50 text-center"}>
                    <h2>Sign In</h2>
                  </div>
                </div>
              </div>

              <div className={"row justify-content-center"}>
                <div className={"col-lg-4"}>
                  <div className={"section-tittle mb-50 "}>
                    <form onSubmit={this._handleSubmit}>
                      <div className="form-group">
                        <label>Username</label>
                        <input type="text" id="username" name="username" className={`form-control ${formErrors.username ? 'is-invalid' : ''}`} placeholder="Enter Username" onChange={this._handleChange} />
                        <div className={"invalid-feedback"}>{formErrors.username}</div>
                      </div>

                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" id="password" name="password" className={`form-control ${formErrors.password ? 'is-invalid' : ''}`} placeholder="Enter Password" onChange={this._handleChange} />
                        <div className={"invalid-feedback"}>{formErrors.password}</div>
                      </div>

                      {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}
                      <div className="text-center">
                        {showError && errorMessage ? <div className="alert alert-danger" role="alert">{errorMessage}</div> : ""}
                        <input type="submit" className={"btn_1 text-uppercase"} value="Login" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: _.get(state, 'auth.login', {}),
  };
};

const mapDispatchToProps = (dispatch) => ({
  doLoginBegin: (payload) => dispatch(doLoginBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
