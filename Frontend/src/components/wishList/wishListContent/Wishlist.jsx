import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Outlet, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import App from "../../../App";
import MyOrder from "../../Myorder/MyOrder";
import Personal from "../../personal&address/Personal";
import General from "../general/General";
import SideMenue from "../sidemenu/Sidemnue";
import Style from "./wishlist.module.css";
import WishListContent from "./WishlistContent";
import { useLocation } from "react-router-dom";

export default function Wishlist() {
	const [route, setRoute] = useState("");

	let location = useLocation();
	useEffect(() => {
		let route = location.pathname.split("/")[2];
		setRoute(route);
	}, [location]);

	return (
		<>
			<ul className={Style.ulist}>
				<li className={Style["list-direct"]}>
					<Link to="/home" style={{ cursor: "pointer" }} className={Style.link}>
						Home
					</Link>
					<svg
						className={Style.arrow}
						height="10"
						width="10"
						viewBox="0 0 18 28"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z" fill="currentColor" />
					</svg>
				</li>
				<li className={Style["list-direct"]}>
					<span>{route}</span>
				</li>
			</ul>
			<div className={Style.container}>
				<div className={Style.sidemenue}>
					<SideMenue />
				</div>
				<div className="outlet-container" style={{ width: "100%" }}>
					{/* <Routes>
						<Route exact path="/whishlist/personal">
							<Personal />
						</Route>
						<Route exact path="/whishlist/myorder">
							<MyOrder />
						</Route>
						<Route exact path="/whishlist/whishlist">
							<WishListContent />
						</Route>
					</Routes> */}
					<Outlet />
				</div>
			</div>
		</>
	);
}
