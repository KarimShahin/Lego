import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCart from "../ProductCart/ProductCart";
import "./Recommended.css";
function Recommended() {
	const [randomProducts, setRandomProducts] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:8080/home/random-products")
			.then((res) => setRandomProducts(res.data.randomProduct))
			.catch((err) => {});
	}, []);

	return (
		<>
			<h2 className="recommended-title">Recommended For You</h2>
			<div className="recommended">
				<div className="boxes">
					{randomProducts.map((product) => {
						return <ProductCart product={product} key={product._id} />;
					})}
				</div>
			</div>
		</>
	);
}

export default Recommended;
