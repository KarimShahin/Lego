import React from "react";
// import  "./ProductCard.css";
// import  "./ProductFilter.css";

export default function ProductFilter() {
	return (
		<>
			<div id="header-filter">
				<span id="reset-all">
					<a href="index.html">Reset All</a>
				</span>
				<span id="done">
					<a href="index.html">Done</a>
				</span>
			</div>

			<div className="container-filter">
				{/* <!-- dropDown --> */}
				<div className="dropdown">
					<button onclick="myFunction()" className="dropbtn">
						<span>
							Sort by<br></br>Rating
						</span>
					</button>
					<div id="myDropdown" className="dropdown-content">
						<a href="#">FEATURED</a>
						<a href="#">PRICE: low to heigh</a>
						<a href="#">PRICE: heigh to low</a>
						<a href="#">RATING</a>
					</div>
				</div>

				<section className="filter">
					<ul className="accordion-menu">
						<li>
							<input type="checkbox" id="producttype" checked />
							<label for="producttype">
								PRODUCTTYPE <i className="fas fa-chevron-down"></i>
							</label>
							<section className="filter-content">
								<input type="checkbox" id="sets" name="sets" value="" />
								<label for="sets"> Sets [48]</label>
								<br></br>
								<input type="checkbox" id="polybag" name="polybag" value="" />
								<label for="polybag"> Polybag [2]</label>
							</section>
						</li>
						<li>
							<input type="checkbox" id="age" />
							<label for="age">
								{" "}
								AGE <i className="fas fa-chevron-down"></i>
							</label>
							<section className="filter-content">
								<input type="checkbox" id="max-4" name="max-4" value="" />
								<label for="max-4"> 4+ [1]</label>
								<br></br>
								<input type="checkbox" id="max-6" name="max-6" value="" />
								<label for="max-6"> 6+ [2]</label>
								<br></br>
								<input type="checkbox" id="max-9" name="max-9" value="" />
								<label for="max-9"> 9+ [1]</label>
								<br></br>
							</section>
						</li>
						<li>
							<input type="checkbox" id="price" />
							<label for="price">
								{" "}
								PRICE <i className="fas fa-chevron-down"></i>
							</label>
							<section className="filter-content">
								<input type="checkbox" id="max-25" name="max-25" value="" />
								<label for="max-25"> $0 - $25 [19]</label>
								<br></br>
								<input type="checkbox" id="max-50" name="max-50" value="" />
								<label for="max-50">$25 - $50 [18]</label>
								<br></br>
								<input type="checkbox" id="max-75" name="max-75" value="" />
								<label for="max-75"> $50 - $75 [7]</label>
								<br></br>
								<input type="checkbox" id="max-100" name="max-100" value="" />
								<label for="max-100"> $75 - $100 [6]</label>
								<br></br>
								<input type="checkbox" id="min-100" name="min-100" value="" />
								<label for="min-100"> $100+ [1]</label>
								<br></br>
							</section>
						</li>
						<li>
							<input type="checkbox" id="featured" />
							<label for="featured">
								FEATURED <i className="fas fa-chevron-down"></i>
							</label>
							<section className="filter-content">
								<input type="checkbox" id="new" name="new" value="" />
								<label for="new"> New [8]</label>
								<br></br>
								<input type="checkbox" id="retiring-soon" name="retiring-soon" value="" />
								<label for="retiring-soon"> Retiring soon [1]</label>
							</section>
						</li>
						<li>
							<input type="checkbox" id="availability" />
							<label for="availability">
								AVAILABILITY <i className="fas fa-chevron-down"></i>
							</label>
							<section className="filter-content">
								<input type="checkbox" id="out-of-Stock" name="out-of-Stock" value="" />
								<label for="out-of-Stock"> Out of Stock [39]</label>
								<br></br>
								<input type="checkbox" id="available-now" name="available-now" value="" />
								<label for="available-now"> Available Now [12]</label>
							</section>
						</li>
						<li>
							<input type="checkbox" id="rating" />
							<label for="rating">
								RATING<i className="fas fa-chevron-down"></i>
							</label>
							<section className="filter-content">
								<input type="checkbox" id="up-2-star" name="up-2-star" value="" />
								<label for="up-2-star">
									<span>
										<i className="fas fa-star"></i>
									</span>
									<span>
										<i className="fas fa-star"></i>
									</span>
									<span>
										<i className="far fa-star"></i>
									</span>
									<span>
										<i className="far fa-star"></i>
									</span>
									<span>
										<i className="far fa-star"></i>
									</span>
									<span>[19]</span>
								</label>
								<br></br>
								<input type="checkbox" id="up-4-star" name="up-4-star" value="" />
								<label for="up-4-star">
									<span>
										<i className="fas fa-star"></i>
									</span>
									<span>
										<i className="fas fa-star"></i>
									</span>
									<span>
										<i className="fas fa-star"></i>
									</span>
									<span>
										<i className="fas fa-star"></i>
									</span>
									<span>
										<i className="far fa-star"></i>
									</span>
									<span>[3]</span>
								</label>
							</section>
						</li>
					</ul>
				</section>
			</div>
		</>
	);
}
