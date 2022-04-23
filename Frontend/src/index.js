import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/fonts/Cera Pro Bold.otf";
import "./assets/fonts/Cera Pro Light.otf";
import "./assets/fonts/Cera Pro Medium.otf";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

//Redux

ReactDOM.render(
	<Provider store={store}>
		<Elements stripe={stripePromise}>
			<App />
		</Elements>
	</Provider>,
	document.getElementById("root")
);
