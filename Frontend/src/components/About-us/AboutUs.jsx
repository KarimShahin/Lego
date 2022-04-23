import React from "react";
import "./AboutUs.css";
import Lego from "./lego_1.gif";

export default function AboutUs() {
	return (
		<div className="about-us-container">
			<div>
				<h1>We're The best in what we do</h1>
				<h3>Lego Team</h3>
			</div>
			<img src={Lego} />
		</div>
	);
}
