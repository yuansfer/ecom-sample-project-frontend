import React from 'react'
import { _ROUTES } from "../../constants/GlobalSetting";

export default function Footer() {
	return (
		<>
			<footer>
				<div className={"footer-area footer-padding gray-bg"}>
					<div className={"container"}>
						<div className={"row d-flex justify-content-between"}>
							<div className={"col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"}>
								<div className={"single-footer-caption mb-20"}>
									<div className={"single-footer-caption mb-0"}>

										<div className={"footer-logo"}>
											<a href={_ROUTES.PRODUCTS_LIST}>
												<img src={"../../assets/images/logo/yuansfer_logo.svg"} alt="" />
											</a>
										</div>
										<div className={"footer-tittle"}>
											<div className={"footer-pera"}>
												<p>Asorem ipsum adipolor sdit amet, consectetur adipisicing elitcf sed do
                                            eiusmod tem.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={"col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"}>
								<div className={"single-footer-caption mb-30"}>
									<div className={"footer-tittle"}>
										<h4>Quick Links</h4>
										<ul>
											<li><a href={_ROUTES.PRODUCTS_LIST}>Home</a></li>
											<li><a href={_ROUTES.CARTS_LIST}>Shop</a></li>
											<li><a href={'#'}>About</a></li>
											<li><a href={'#'}>Blog</a></li>
											<li><a href={'#'}>Contact</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div className={"col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"}>
								<div className={"single-footer-caption mb-30"}>
									<div className={"footer-tittle"}>
										<h4>New Products</h4>
										<ul>
											<li><a href={'/products/1/view'}>ElseIf (Ethiopian, Light Roast)</a></li>
											<li><a href={'/products/2/view'}>Push (Peruvian, Medium)</a></li>
											<li><a href={'/products/3/view'}>Join (Jamaican Blue, Light)</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div className={"col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"}>
								<div className={"single-footer-caption mb-30"}>
									<div className={"footer-tittle"}>
										<h4>Support</h4>
										<ul>
											<li><a href="#">Frequently Asked Questions</a></li>
											<li><a href="#">Terms & Conditions</a></li>
											<li><a href="#">Privacy Policy</a></li>
											<li><a href="#">Report a Payment Issue</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}