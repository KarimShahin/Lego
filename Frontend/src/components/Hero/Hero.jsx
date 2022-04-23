import "./Hero.css";
import cityLogo from "../../assets/imgs/city_logo.png";
import cityHome from "../../assets/imgs/City-Home-202201-Hero-Standard-Small.jpg";
import { NavLink } from "react-router-dom";

export default function Hero() {
	return (
		<>
			<section className="carousel">
				<div className="hero-label">
					<img src={cityHome} className="small-devices" alt="" />
					<img src="../../assets/imgs/hero-img.jpg" alt="" />
					<div className="hero-bg-blue">
						<img src={cityLogo} className="city-img" alt="city logo" />
						<div className="hero-content">
							<h2>
								Look who's new in LEGO
								<sup>
									<i className="far fa-registered"></i>
								</sup>{" "}
								City
							</h2>
							<p>Meet the awesome new line-up of everyday heroes.</p>
							<div className="hero-btns">
								<NavLink to="/shop-now" className="btn">
									Shop now <i className="fas fa-chevron-right"></i>
								</NavLink>
								<NavLink to="/about-us" className="btn">
									Learn more <i className="fas fa-chevron-right"></i>
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
