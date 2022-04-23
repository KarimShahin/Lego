import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductDetailsById } from "../../network/productsAPIs";
import { useDispatch } from "react-redux";
import { addToWishList, deleteFromWishList, getWishList } from "../../network/wishListAPI";
import { addToBag } from "../../Redux/Actions/cartActions";
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import "./ProductPage.css";

export default function ProductPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [fillHeart, setfillHeart] = useState(false);
	const [didMount, setDidMount] = useState(false);
	const [wishList, setWishList] = useState([]);
	const Location = useLocation();
	useEffect(() => {
		if (Location.state) {
			getProductDetailsById(Location.state._id)
				.then((res) => {
					setProduct(res.data);
				})
				.catch((err) => {});
		}
	}, []);
	useEffect(() => {
		getWishList().then((data) => {
			let ids = data.data.wishlist.map((p) => p._id);
			if (ids.includes(product?._id)) {
				setfillHeart(true);
			}
			setWishList(ids);
		});
	}, []);

	const addItem = () => {
		let token = localStorage.getItem("token");
		if (token) {
			dispatch(addToBag({ ...product }));
		} else {
			navigate("/login");
		}
	};

	const addWishList = (product) => {
		let token = localStorage.getItem("token");
		if (token) {
			addToWishList(product).then(() => {
				setWishList((prevState) => [...prevState, product._id]);
			});
		} else {
			navigate("/login");
		}
	};

	const removeFromWishList = (product) => {
		let token = localStorage.getItem("token");
		if (token) {
			deleteFromWishList(product).then(() => {
				let newWishlist = wishList.filter((id) => id !== product._id);
				setWishList(newWishlist);
			});
		} else {
			navigate("/login");
		}
	};

	useEffect(() => {
		setDidMount(true);
	});
	useEffect(() => {
		if (didMount) {
			addOrRemove();
		}
	}, [fillHeart]);

	const toggling = (e) => {
		e.stopPropagation();
		setfillHeart((prevState) => !prevState);
	};

	const addOrRemove = () => {
		if (fillHeart) {
			let newWishlist = wishList.filter((id) => id !== product._id);
			// if(newWishlist) return;
			addWishList(product);
		} else {
			removeFromWishList(product);
		}
	};
	return (
		<>
			<div className="product-single-page">
				<SwiperSlider className="swiper" images={product?.images} />
				<div className="single-product-side">
					<div className="add-to-wishlist">
						<span onClick={addOrRemove}>
							<i
								onClick={toggling}
								className={
									fillHeart || wishList.includes(product?._id) ? "fa fa-heart" : "far fa-heart"
								}
							></i>
						</span>
						<span>Add to wish list</span>
					</div>
					<h3 className="title">{product?.name}</h3>
					<h4 className="category">{product?.category?.name}</h4>
					<h3 className="price">{product?.price} EGP</h3>
					<button onClick={() => addItem()} className="add-to-bag" type="button">
						Add to Bag
					</button>
				</div>
			</div>
		</>
	);
}
