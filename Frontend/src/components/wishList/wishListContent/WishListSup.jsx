import React from "react";
import { Link } from "react-router-dom";
import Style from "./wishlist.module.css";

export default function WishListSup() {
  return (
    <div>
      {" "}
      <div className={Style["wish-supp"]}>
        <img src="/imags/Support_2.png" className={Style["img-supp"]} />
        <span className={Style["supp-heading"]}>Support</span>
        <div className={Style["line-break"]}></div>
        <div className={Style["wrapper-supp"]}>
          <div className={Style["cont-supp-link"]}>
            <Link to='/Deliveries' className={Style["supp-link"]}>
              Deliveries and Returns
            </Link>
            <Link to="/FAQs" className={Style["supp-link"]}>
              FAQs
            </Link>
          </div>
          <div className={Style["line-breakTwo"]}></div>
          <div className={Style["cont-supp-link"]}>
            <Link  to="/Contact" className={Style["supp-link"]}>
              Contact{" "}
            </Link>
            <Link to="/Replacement" className={Style["supp-link"]}>
              Replacement Parts and Instructions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
