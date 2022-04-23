import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./HomePage.css";
export default function HomeCard({ product }) {
	const Navigate = useNavigate();
	return (
		<div style={{ width: "25%" }}>
			<div className="card-1">
				<div className="main-image">
					<img
						style={{ cursor: "pointer" }}
						onClick={() => Navigate("/card", { state: { _id: product?._id } })}
						src={`http://localhost:8080/images/${product?.images[0]}`}
						alt={product?.name}
					/>
				</div>
				<div className="text-container">
					<h4
						style={{ cursor: "pointer" }}
						onClick={() => Navigate("/card", { state: { _id: product?._id } })}
					>
						{product?.name}
					</h4>
					<div className="shop">
						<NavLink to="/shop-now">
							Shop Now
							<i className="fas fa-angle-right"></i>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}
