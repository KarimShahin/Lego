import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./SwiperSlider.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function SwiperSlider({ images }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	// get product data from Backend
	return (
		<div className="slider-container">
			{/* main right floating*/}
			<Swiper
				style={{
					"--swiper-navigation-color": "#c4c4c4",
					"--swiper-pagination-color": "#c4c4c4",
				}}
				spaceBetween={10}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper2"
			>
				{images?.map((image, index) => (
					<SwiperSlide key={index}>
						<img src={`http://localhost:8080/images/${image}`} alt="" />
					</SwiperSlide>
				))}
			</Swiper>

			{/* nested left floating*/}
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper"
			>
				{images?.map((image, index) => (
					<SwiperSlide key={index}>
						<img src={`http://localhost:8080/images/${image}`} alt="" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
