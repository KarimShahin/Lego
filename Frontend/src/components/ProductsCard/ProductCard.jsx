import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CustomFilter from "./../CustomFilter/CustomFilter";
import Cards from "./Cards";
import jwt_decode from "jwt-decode";
import "./ProductCard.css";
import { getProduct, getProductDetails } from "../../network/productsAPIs";
import { getWishList } from "../../network/wishListAPI";

export default function ProductCard() {
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(1);
	const [products, setProducts] = useState([]);
	const [filterValues, setFilterValues] = useState({});
	const [wishList, setWishList] = useState([]);
	const [isAdmin, setIsAdmin] = useState(() => {
		return localStorage.getItem("token")
			? jwt_decode(localStorage.getItem("token")).role === "admin"
				? true
				: false
			: false;
	});
	function handleClick(event) {
		event.preventDefault();
	}
	useEffect(() => {
		console.log(isAdmin);
		if (isAdmin) {
			getWishList().then((data) => {
				let ids = data.data.wishlist.map((p) => p._id);
				// if (ids.includes(product._id)) {
				// 	setfillHeart(true);
				// }
				setWishList(ids);
			});
		}
		return () => {};
	}, []);
	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		getProduct(12, page, filterValues)
			.then((res) => {
				setProducts(res.data.products);
				setCount(res.data.count);
			})
			.catch((err) => {});
		return () => {};
	}, [page]);
	useEffect(() => {
		getProduct(12, page, filterValues)
			.then((res) => {
				setProducts(res.data.products);
				setCount(res.data.count);
				setPage(1);
			})
			.catch((err) => {});
		return () => {};
	}, [filterValues]);

	const handelFilterChange = (filterValues) => {
		setFilterValues(filterValues);
	};

	return (
		<>
			<div className="shop-container">
				<div role="presentation" className="breadcrumbs" onClick={handleClick}>
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize="small" />}
						sx={{ pt: 1 }}
						aria-label="breadcrumb"
					>
						<NavLink underline="hover" color="inherit" to="/">
							<Typography color="#006db7">Home</Typography>
						</NavLink>
						<Typography color="text.primary">Shop Now</Typography>
					</Breadcrumbs>
				</div>
				<section className="shop-now ">
					<div className="filter">
						<CustomFilter handelFilterChange={handelFilterChange} />
					</div>
					<section className="cards">
						{/* <!-- cards-header-section --> */}
						<div className="cards-header-section">
							<span>
								Showing {count < 12 ? count : 12} of {count} Products
							</span>
						</div>
						{/* <!-- cards ccontainer --> */}
						<Grid container sx={{ display: "flex", alignItems: "stretch" }}>
							{products.map((item) => (
								<Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
									<Cards isAdmin={isAdmin} product={item} />
								</Grid>
							))}
						</Grid>

						{/* <!-- sliding --> */}
						<div className="sliding">
							<Stack spacing={2}>
								<Pagination count={Math.ceil(count / 12) || 1} card={page} onChange={handleChange} />
							</Stack>
						</div>
					</section>
				</section>
			</div>
		</>
	);
}
