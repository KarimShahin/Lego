import bag from "../../assets/imgs/40527 (1).png";
import bagTwo from "../../assets/imgs/10297.png";

import "./Bag.css";
import { useState } from "react";
import Main from "./main";
import Promo from "./promo";

export default function MyBag() {
	return (
		<div className="px-5 my-4">
			<div className="row bg-body">
				<Main />
				<Promo />
			</div>
		</div>
	);
}
