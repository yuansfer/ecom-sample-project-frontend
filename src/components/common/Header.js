import React, { Component } from 'react'
import { connect } from "react-redux";

import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash';
import { Nav } from 'react-bootstrap';

import { _logoutLocalStorage, _isLoggedIn } from "../../utils/helper";
import { doLogoutBegin } from "../../store/auth/actions";
import { _ROUTES } from "../../constants/GlobalSetting";

class Header extends Component {

	componentDidUpdate(prevProps) {
		const { logout, history } = this.props;
		if (prevProps.logout !== logout) {
			const { result: { success } } = logout;
			if (success) {
				_logoutLocalStorage()
				history.push(_ROUTES.LOGIN);
			}
		}
	}

	_handleLogout = () => {
		this.props.doLogoutBegin()
	}

	render() {
		const loggedInUser = _isLoggedIn()
		return (
			<>
				<header>
					<div className={"header-area"}>
						<div className={"main-header header-sticky"}>
							<div className={"container"}>
								<div className={"menu-wrapper"}>

									<div className={"logo"}>
										<Nav.Item>
											<Link to={_ROUTES.PRODUCTS_LIST}><img src={"../../assets/images/logo/yuansfer_logo.svg"} alt="Yuansfer" style={{ maxWidth: 140 }} /></Link>
										</Nav.Item>
									</div>

									<div className={"main-menu d-none d-lg-block ml-5"}>
										<Nav activeKey={_ROUTES.PRODUCTS_LIST}>
											<ul id="navigation">
												<li>
													<Nav.Item>
														<Link to={_ROUTES.PRODUCTS_LIST}>Products</Link>
													</Nav.Item>
												</li>
												<li>
													<Nav.Item>
														<Link to={_ROUTES.CARTS_LIST}>Shop</Link>
													</Nav.Item>
												</li>
												<li>
													<Nav.Item>
														<Link to={"#"}>About</Link>
													</Nav.Item>
												</li>
												<li>
													<Nav.Item>
														<Link to={"#"}>Blog</Link>
													</Nav.Item>
												</li>
												<li>
													<Nav.Item>
														<Link to={"#"}>Contact</Link>
													</Nav.Item>
												</li>
											</ul>
										</Nav>
									</div>

									<div className={"header-right ml-auto"}>
										<ul>
											{/* <li>
												<div className={"nav-search search-switch"}>
													<span id="search_1" className={"flaticon-search"}></span>
												</div>
											</li> */}
											<li>
												<Nav.Item>
													<Link to={_ROUTES.CARTS_LIST}>
														<span className={"flaticon-shopping-cart"}>
														</span>
													</Link>
												</Nav.Item>
											</li>

											{loggedInUser && <li>
												<Nav.Item>
													<Link to={_ROUTES.CUSTOMER_SUBSCRIPTION}>
														<span className={"flaticon-user"}>
														</span>
													</Link>
												</Nav.Item>
											</li>
											}

											{!loggedInUser && <li>
												<Nav.Item>
													<Link to={_ROUTES.LOGIN}>
														<span>
															<i className="fa fa-sign-in-alt" ></i>
														</span>
													</Link>
												</Nav.Item>
											</li>
											}

											{loggedInUser &&
												<li>
													<span className="logout" onClick={() => this._handleLogout()}>
														<i className="fa fa-sign-out-alt" ></i>
													</span>
												</li>
											}
										</ul>
									</div>
								</div>
								<div className={"col-12"}>
									<div className={"mobile_menu d-block d-lg-none"}></div>
								</div>
							</div>
						</div>
					</div>
				</header>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		login: _.get(state, 'auth.login', {}),
		logout: _.get(state, 'auth.logout', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	doLogoutBegin: () => dispatch(doLogoutBegin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));