import React from "react";
import "./ProductCart.css";
import { useNavigate } from "react-router-dom";
import ReviewStars from "../ReviewStars/ReviewStars";
import { addToBag } from "../../Redux/Actions/cartActions";
import { useDispatch } from "react-redux";

function ProductCart({ product }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const addItem = () => {
		let token = localStorage.getItem("token");
		if (token) {
			dispatch(addToBag({ ...product }));
		} else {
			navigate("/login");
		}
	};
	return (
		<div className="recommended-card">
			<div className="image-container" style={{ width: "100%", overflow: "hidden" }}>
				<img
					onClick={() => navigate("/card", { state: { _id: product._id } })}
					src={`http://localhost:8080/images/${product?.images?.[0]}`}
					className="product-card-img"
				/>
			</div>
			{/* <div className="new-item">new</div> */}
			<div className="card-name">
				<p onClick={() => navigate("/card", { state: { _id: product._id } })} style={{ cursor: "pointer" }}>
					{product?.name}
				</p>
			</div>
			<span>
				<ReviewStars count={product?.rating} />
			</span>
			<div className="card-price">{product?.price} EGP</div>
			<button className="card-button-exist" onClick={() => addItem()}>
				Add to Bag
			</button>
		</div>
	);
}

export default ProductCart;
