import React from 'react'
import { Nav } from 'react-bootstrap';
import { _ROUTES } from "../../constants/GlobalSetting";

export default function Header() {
	return (
		<>
			<header>
				<div className={"header-area"}>
					<div className={"main-header header-sticky"}>
						<div className={"container"}>
							<div className={"menu-wrapper"}>

								<div className={"logo"}>
									<a href={_ROUTES.PRODUCTS_LIST}>
										<img src={"../../assets/images/logo/yuansfer_logo.svg"} alt="Yuansfer" style={{ maxWidth: 140 }} />
									</a>
								</div>

								<div className={"main-menu d-none d-lg-block ml-5"}>
									<Nav activeKey={_ROUTES.PRODUCTS_LIST}>
										<ul id="navigation">
											<li>
												<Nav.Item>
													<Nav.Link href={_ROUTES.PRODUCTS_LIST}>Home</Nav.Link>
												</Nav.Item>
											</li>

											<li>
												<Nav.Item>
													<Nav.Link href={_ROUTES.CARTS_LIST}>Shop</Nav.Link>
												</Nav.Item>
											</li>
											<li>
												<Nav.Item>
													<Nav.Link href={"#"}>About</Nav.Link>
												</Nav.Item>
											</li>
											<li>
												<Nav.Item>
													<Nav.Link href={"#"}>Blog</Nav.Link>
												</Nav.Item>
											</li>
											<li>
												<Nav.Item>
													<Nav.Link href={"#"}>Contact</Nav.Link>
												</Nav.Item>
											</li>
										</ul>
									</Nav>
								</div>

								<div className={"header-right ml-auto"}>
									<ul>
										<li>
											<div className={"nav-search search-switch"}>
												<span id="search_1" className={"flaticon-search"}></span>
											</div>
										</li>
										<li>
											<a href={_ROUTES.CARTS_LIST}>
												<span className={"flaticon-shopping-cart"}>
												</span>
											</a>
										</li>
										<li>
											<a href={_ROUTES.CUSTOMER_SUBSCRIPTION}>
												<span className={"flaticon-user"}></span>
											</a>
										</li>
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