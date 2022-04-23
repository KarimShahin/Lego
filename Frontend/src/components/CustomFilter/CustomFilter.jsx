import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getAllCategory } from "../../network/productsAPIs";
import "./CustomFilter.css";

export default function CustomFilter(props) {
	const [categories, setCategories] = useState([]);
	const [priceRangeFilter, setPriceRangeFilter] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState([]);
	const [ratingFilter, setRatingFilter] = useState([]);
	const [isReset, setReset] = useState(false);

	const handelPriceRangeFilter = (e) => {
		setReset(false);
		if (e.target.checked) {
			setPriceRangeFilter([...priceRangeFilter, e.target.name]);
		} else {
			setPriceRangeFilter(priceRangeFilter.filter((value) => value !== e.target.name));
		}
	};

	const handelCategoryFilter = (e) => {
		setReset(false);
		if (e.target.checked) {
			setCategoryFilter([...categoryFilter, e.target.value]);
		} else {
			setCategoryFilter(categoryFilter.filter((value) => value !== e.target.value));
		}
	};

	const handelRatingFilter = (e) => {
		setReset(false);
		if (e.target.checked) {
			setRatingFilter([...ratingFilter, e.target.value]);
		} else {
			setRatingFilter(ratingFilter.filter((value) => value !== e.target.value));
		}
	};

	useEffect(() => {
		//SEND REQUEST ON FILTER CHANGE
		props.handelFilterChange({
			priceRange: [...priceRangeFilter],
			category: [...categoryFilter],
			rating: [...ratingFilter],
		});
	}, [priceRangeFilter, categoryFilter, ratingFilter]);

	useEffect(() => {
		// Get All category
		getAllCategory().then((res) => setCategories(res.data.body));
	}, []);

	useEffect(() => {
		// Get All category
		if (isReset) {
			setPriceRangeFilter([]);
			setCategoryFilter([]);
			setRatingFilter([]);
		}
	}, [isReset]);

	return (
		<div className="inner-filter">
			<Accordion onClick={() => setReset(true)} disableGutters>
				<AccordionSummary aria-controls="panel3a-content" id="panel3a-header">
					<Typography>Reset All</Typography>
				</AccordionSummary>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>Category</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{/* checkboxes goeas here */}
					<FormGroup>
						{categories.map((category) => (
							<FormControlLabel
								key={category._id}
								name={category.name}
								control={<Checkbox checked={categoryFilter.includes(String(category._id))} />}
								label={category.name}
								value={category._id}
								onChange={handelCategoryFilter}
							/>
						))}
					</FormGroup>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
					<Typography>Price</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{/* checkboxes goeas here */}
					<FormGroup>
						<FormControlLabel
							name="0-25"
							control={<Checkbox checked={priceRangeFilter.includes("0-25")} />}
							label="0 - 25 EGP"
							value=""
							onChange={handelPriceRangeFilter}
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							name="26-50"
							control={<Checkbox checked={priceRangeFilter.includes("26-50")} />}
							label="25 - 50 EGP"
							value=""
							onChange={handelPriceRangeFilter}
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							name="51-75"
							control={<Checkbox checked={priceRangeFilter.includes("51-75")} />}
							label="50 - 75 EGP"
							value=""
							onChange={handelPriceRangeFilter}
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							name="76-100"
							control={<Checkbox checked={priceRangeFilter.includes("76-100")} />}
							label="75 - 100 EGP"
							value=""
							onChange={handelPriceRangeFilter}
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							name="101-1000"
							control={<Checkbox checked={priceRangeFilter.includes("101-1000")} />}
							label="Above 100 EGP"
							value=""
							onChange={handelPriceRangeFilter}
						/>
					</FormGroup>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
					<Typography>Rating</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{/* checkboxes goeas here */}
					<FormGroup>
						<FormControlLabel
							name="up-1-star"
							control={<Checkbox checked={ratingFilter.includes("1")} />}
							label={
								<>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star gray-star"></i>
									<i className="fas fa-star gray-star"></i>
									<i className="fas fa-star gray-star"></i>
									<i className="fas fa-star gray-star"></i>
								</>
							}
							value="1"
							onChange={handelRatingFilter}
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							name="up-2-star"
							control={<Checkbox checked={ratingFilter.includes("2")} />}
							label={
								<>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star gray-star"></i>
									<i className="fas fa-star gray-star"></i>
									<i className="fas fa-star gray-star"></i>
								</>
							}
							value="2"
							onChange={handelRatingFilter}
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							name="up-3-star"
							control={<Checkbox checked={ratingFilter.includes("3")} />}
							label={
								<>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star gray-star"></i>
									<i className="fas fa-star gray-star"></i>
								</>
							}
							value="3"
							onChange={handelRatingFilter}
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							name="up-4-star"
							control={<Checkbox checked={ratingFilter.includes("4")} />}
							label={
								<>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star gray-star"></i>
								</>
							}
							value="4"
							onChange={handelRatingFilter}
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							name="up-5-star"
							control={<Checkbox checked={ratingFilter.includes("5")} />}
							label={
								<>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
									<i className="fas fa-star yellow-star"></i>
								</>
							}
							value="5"
							onChange={handelRatingFilter}
						/>
					</FormGroup>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
