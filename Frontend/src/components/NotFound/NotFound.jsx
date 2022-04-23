import React from "react";
import "./NotFound.css";
import Layout from "../Layout/Layout";

export default function NotFound() {
	return (
		<>
			<Layout>
				<div className="not-found">
					<h1>404</h1>
					<p>Not Found</p>
				</div>
			</Layout>
		</>
	);
}
