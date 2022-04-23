import React from "react";
import "./DeveloperCard.css";

export default function DeveloperCard({ developer }) {
	return (
		<div className="developer-card">
			<div className="developer-image">
				<img src={developer.image} />
			</div>
			<h5>{developer.name}</h5>
			<p>{developer.email}</p>
			<div className="social">
				<a className="social-link" href={developer.linkedIn}>
					<i className="fab fa-linkedin"></i>LinkedIn
				</a>
				<a className="social-link" href={developer.github}>
					<i className="fab fa-github-square"></i>Github
				</a>
			</div>
		</div>
	);
}
