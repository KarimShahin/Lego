import React from "react";
import { Link } from "react-router-dom";
import Logo from "./../../assets/imgs/footer-logo.svg";
import ChevoeronRight from "./../../assets/imgs/right-arrow.svg";
import "./Footer.css";
import FooterColumn from "./FooterColumn";

function Footer() {
	return (
		<footer>
			<section className="socialmedia-wrapper">
				<div className="logo-region">
					<img src={Logo} alt="" />
				</div>
				<div className="follow">
					<h6>Follow us</h6>
					<div className="social-icons">
						<a href="https://www.facebook.com/legooo4u/" className="icon fa">
							<i className="fab fa-facebook-f"></i>
						</a>
						<Link to="/" className="icon tw">
							<i className="fab fa-twitter"></i>
						</Link>
						<Link to="/" className="icon insta">
							<i className="fab fa-instagram"></i>
						</Link>
						<Link to="/" className="icon yout">
							<i className="fab fa-youtube"></i>
						</Link>
					</div>
				</div>
			</section>
			<section className="footer-copyright">
				<p>
					This website cloned and developed by&copy; Mahmoud Essam, Karim shahin, Romisaa Samir, Mahmoud Emam,
					Alaa Abdelmotelb, Ahmed Mansour.
				</p>
			</section>
		</footer>
	);
}

export default Footer;
