import "./Menu.css";
import { useSelector } from "react-redux";
import legoUser from "../../assets/imgs/lego-user.svg";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
export default function Menu(props) {
	const totalItemsCount = useSelector((store) => store.cart.totalItemsCount);

	return (
		<>
			<div className={`menu-bar ${props.openMenuBar ? "open" : ""}`}>
				<header>
					<div>Menu</div>
					<a onClick={props.toggleMenu}>
						<i className="fas fa-times"></i>
					</a>
				</header>
				<div className="flex-wrapper">
					<ul className="menu-bar-list">
						<li className="menu-bar-list-item">
							<NavLink onClick={() => props.setOpenMenuBar(false)} to="/home">
								HOME
							</NavLink>
						</li>
						<li className="menu-bar-list-item">
							<NavLink onClick={() => props.setOpenMenuBar(false)} to="/shop-now">
								SHOP
							</NavLink>
						</li>
						<li className="menu-bar-list-item">
							<NavLink onClick={() => props.setOpenMenuBar(false)} to="/about-us">
								ABOUT US
							</NavLink>
						</li>
						<li className="menu-bar-list-item">
							<NavLink onClick={() => props.setOpenMenuBar(false)} to="/contact-us">
								CONTACT US
							</NavLink>
						</li>
						{props.isAdmin && (
							<li className="menu-bar-list-item">
								<NavLink onClick={() => props.setOpenMenuBar(false)} to="/dashboard">
									DASHBOARD
								</NavLink>
							</li>
						)}
						{props.isShipper && (
							<li className="menu-bar-list-item">
								<NavLink onClick={() => props.setOpenMenuBar(false)} to="/shipper">
									DASHBOARD
								</NavLink>
							</li>
						)}
						{!props.isAdmin && !props.isShipper && (
							<>
								<li className="menu-bar-list-item">
									<NavLink
										onClick={() => props.setOpenMenuBar(false)}
										to={props.isLoggedIn ? "/whishlist/personal" : "/login"}
										className="user-icon"
									>
										<img src={legoUser} className="svg" />
										{props.isLoggedIn
											? `${jwt_decode(localStorage.getItem("token")).user.userName}`
											: "Account"}
									</NavLink>
								</li>
								<li className="menu-bar-list-item">
									<NavLink onClick={() => props.setOpenMenuBar(false)} to="/whishlist/whishlist">
										My Wishlist
									</NavLink>
								</li>
								<li className="menu-bar-list-item">
									<NavLink onClick={() => props.setOpenMenuBar(false)} to="/mybag">
										My Bag <span>({totalItemsCount})</span>
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</>
	);
}
