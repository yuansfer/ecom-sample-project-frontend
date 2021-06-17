import React from 'react'
import { connect } from "react-redux";

import { Modal, } from 'react-bootstrap';

import _ from 'lodash';
import { doLoginBegin } from "../../store/auth/actions";
import { _ROUTES } from "../../constants/GlobalSetting";
class LoginModal extends React.Component {

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
    showLogin: true,
    showError: false,
    errorMessage: '',
  }

  componentDidUpdate(prevProps) {
    const { login } = this.props;
    if (prevProps.login !== login) {
      const { result: { success, message } } = login;
      if (success) {
        this.props._onLoginModalHide({ showLogin: false, })
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

  render() {

    const { formErrors, showError, errorMessage, showLogin } = this.state;

    return (
      <>
        <Modal show={showLogin} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={"contact_form"} onSubmit={this._handleSubmit}>
              <div className="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" className={`form-control ${formErrors.username ? 'is-invalid' : ''}`} placeholder="Enter Username" onChange={this._handleChange} />
                <div className={"invalid-feedback"}>{formErrors.username}</div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" id="password" name="password" className={`form-control ${formErrors.password ? 'is-invalid' : ''}`} placeholder="Enter Password" onChange={this._handleChange} />
                <div className={"invalid-feedback"}>{formErrors.password}</div>
              </div>
              {showError && errorMessage ? <div className="alert alert-danger" role="alert">{errorMessage}</div> : ""}
              <div className="text-center">
                <input type="submit" className={"btn_1 text-uppercase login-button"} value="Login" />
                <a className={"btn_1 text-uppercase login-button"} href={_ROUTES.PRODUCTS_LIST}>Continue Shopping</a>
              </div>
            </form>
          </Modal.Body>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);