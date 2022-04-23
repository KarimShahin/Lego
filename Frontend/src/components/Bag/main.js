import bag from "../../assets/imgs/40527 (1).png";
import bagTwo from "../../assets/imgs/10297.png";

import "./Bag.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToBag, removeFromBag, deleteFromBag } from "../../Redux/Actions/cartActions";
export default function Main() {
	const dispatch = useDispatch();
	const [count, setCount] = useState(0);
	const cart = useSelector((store) => store.cart);

	// const [itemProducts,setItemProducts] = useState({})
	// useEffect(()=>{
	//     let uniqueProduct ={}
	//     cart.products.forEach(product=>{
	//         if(uniqueProduct[product._id]){
	//             uniqueProduct[product._id] = {...uniqueProduct[product._id],count:uniqueProduct[product._id].count + 1}
	//         }else{
	//             uniqueProduct[product._id] = {...product,count:1}
	//         }
	//     })
	//     console.log('MY PRODUCTS ',uniqueProduct)
	//     setItemProducts(uniqueProduct)
	// },[cart])

	return (
		<div className="col-12 col-md-8 border bg-white p-3">
			<p className="border-bottom text-success py-2"> Available now</p>

			{cart ? (
				Object.values(cart.products).map((product) => (
					<div className="d-flex justify-content-between align-items-center border px-3 py-3 my-4">
						<figure className="w-img">
							<img src={`http://localhost:8080/images/${product?.images?.[0]}`} className="w-100 "></img>
						</figure>

						<div>
							<p>{product.name}</p>
							<p>{product.price} EGP</p>
						</div>

						<div className="border rounded">
							<span
								className="counter p-1 px-3"
								style={{
									pointerEvents: product.quantity == 1 ? "none" : "",
									color: product.quantity == 1 ? "#d9d0d0" : "",
								}}
								onClick={() => {
									// setCount(count - 1)
									dispatch(removeFromBag(product));
								}}
							>
								-
							</span>
							<span className="counter p-1 px-3">{product.quantity}</span>
							<span
								className="counter border-0 p-1 px-3"
								style={{
									pointerEvents: product.quantity >= product.amount ? "none" : "",
									color: product.quantity >= product.amount ? "#d9d0d0" : "",
								}}
								onClick={() => {
									// setCount(count + 1)
									dispatch(addToBag(product));
								}}
							>
								+
							</span>
						</div>

						<div>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => dispatch(deleteFromBag(product))}
							>
								delete
							</button>
						</div>
					</div>
				))
			) : (
				<div>No Items in your bag </div>
			)}
		</div>
	);
}
