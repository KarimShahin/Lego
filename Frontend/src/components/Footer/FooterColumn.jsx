import React from "react";
import CheveronDown from "./../../assets/imgs/chevron-down.svg";

function FooterColumn({ title, footerLinks }) {
  const expand = (e) => {
    if (e.target.tagName === "IMG") {
      e.target.parentElement.classList.toggle("column-ul-active");
    }
    e.target.classList.toggle("column-ul-active");
  };
  return (
    <div className="column">
      <h4 onClick={expand}>
        {title} <img src={CheveronDown} alt="" />
      </h4>
      <ul>
        {footerLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.src}
              dangerouslySetInnerHTML={{ __html: link.name }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterColumn;
