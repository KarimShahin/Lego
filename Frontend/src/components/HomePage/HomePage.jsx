import React from "react";
import Women from "../../assets/images/woman.png";
import HomeCard from "./HomeCard";
import Hero from "./../Hero/Hero";
import Recommended from "./../Recommended/Recommended";
import { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "./HomePage.css";
import { NavLink, useLocation } from "react-router-dom";

export default function HomePage(props) {
	const [trendingProducts, setTtrendingProducts] = useState([]);
	const [newProducts, setNewProducts] = useState([]);
	const [notification, setNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	// notification
	const Location = useLocation();
	const openNotificationMsg = (message) => {
		setNotificationMessage(message);
		setNotification(true);
	};
	const hideNotificationMsg = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setNotification(false);
	};
	useEffect(() => {
		axios
			.get("http://localhost:8080/home/trending-products")
			.then((res) => {
				setTtrendingProducts(res.data.trendingProducts);
			})
			.catch((err) => {});
		if (Location.state) {
			openNotificationMsg(Location.state.message);
		}
		return () => {};
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:8080/home/new-products")
			.then((res) => {
				setNewProducts(res.data.newProducts);
			})
			.catch((err) => {});
		return () => {};
	}, []);

	return (
		<>
			<Hero />
			<Recommended />
			{/* Keep-in-touch */}
			<div className="keep-in-touch-container">
				<section className="keep-in-touch-inner">
					<div className="keep-in-touch-wrapper">
						<div className="left-side-content">
							<h2>Only the best is good enough</h2>
							<p>
								As children shape their own worlds with LEGO bricks, we play our part in having a
								positive impact on the world they live in today and will inherit in the future.
							</p>
							<NavLink className="shop-now-btn" to="/shop-now">
								Shop Now
								<i className="fas fa-angle-right"></i>
							</NavLink>
						</div>
						<div className="right-side-content">
							<img src={Women} alt="" />
						</div>
					</div>
				</section>
			</div>

			{/* Spotlight-on */}
			<div className="spotlight-on-container">
				<section id="spotlight-on">
					<div className="card-section">
						{/* card inner content */}
						<div className="card-header-spotlight">
							<h2>Spotlight on</h2>
						</div>

						{/* card outer content  */}
						<div className="card-container">
							{newProducts.map((product) => {
								return <HomeCard product={product} key={product._id} />;
							})}
						</div>
					</div>
				</section>
			</div>

			{/* trending Now */}
			<div className="spotlight-on-container">
				<section id="spotlight-on">
					<div className="card-section">
						{/* card inner content */}
						<div className="card-header-spotlight">
							<h2>
								<span>Trending Now</span>
							</h2>
						</div>

						{/* card outer content  */}
						<div className="card-container">
							{trendingProducts.map((product) => {
								return <HomeCard key={product._id} product={product} />;
							})}
						</div>
					</div>
				</section>
			</div>

			<Snackbar open={notification} autoHideDuration={3000} onClose={hideNotificationMsg} severity="success">
				<Alert onClose={hideNotificationMsg} severity="success" sx={{ width: "100%" }}>
					{notificationMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
