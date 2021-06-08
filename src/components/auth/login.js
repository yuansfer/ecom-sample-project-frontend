import React, { Component } from 'react'
import { connect } from "react-redux";

import _ from 'lodash';
import { doLoginBegin } from "../../store/auth/actions";
import { _ROUTES } from "../../constants/GlobalSetting";
import ErrorModal from '../common/ErrorModal';

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

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    const { login } = this.props;
    if (prevProps.login !== login) {
      const { result: { data, success, error, message } } = login;
      if (success) {
        this.props.history.push(_ROUTES.PRODUCTS_LIST)
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
    this._handleValidation(target);
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

              <form className={"contact_form"} onSubmit={this._handleSubmit}>
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
                <input type="submit" className={"btn_1 text-uppercase mb-15 cursor-pointer"} value="Submit" />
              </form>
            </div>
          </section>
        </main>
        <ErrorModal showError={showError} title={"Error"} body={errorMessage} _onHide={this._onHide} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
