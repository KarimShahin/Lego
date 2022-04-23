import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteFromWishList, getWishList } from '../../../network/wishListAPI';
import { addToBag } from '../../../Redux/Actions/cartActions';
import './WishListCart.css'

function WishListCart({product}) {

  const navigate = useNavigate();
  const [wishList, setWishList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
		getWishList().then((data) => {
			let ids = data.data.wishlist.map((p) => p._id);
			setWishList(ids);
		});
	}, []);
  
 
	const removeFromWishList = (product) => {
		let token = localStorage.getItem("token");
		if (token) {
			deleteFromWishList(product).then(() => {
				let newWishlist = wishList.filter((id) => id != product._id);
				setWishList(newWishlist);
       
			});
		} else {
			navigate("/login");
		}
	};

  const addItem = () => {
		let token = localStorage.getItem("token");
		if (token) {
			dispatch(addToBag({ ...product }));
		} else {
			navigate("/login");
		}
	};


  return (
    <>
         <div className="product-cart">
        <div className="box">
          <div className="cardImage">
              <i className="fas fa-trash" onClick={removeFromWishList(product)}></i>
            
            <img
              src={`http://localhost:8080/images/${product.images[0]}`}
              alt={product.name}
            />
            <p className="new">New</p>
          </div>
          <Link className="product-title" to="#">
            {product.name}
          </Link>
          <div className="stars">
          </div>
          <p className="price">{product.price} EGP</p>
          <input type="button" value="Add to Bag"  onClick={() => addItem()}/>
        </div>
      </div>
    </>
  )
}

export default WishListCart