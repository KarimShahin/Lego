import React from "react";
import SpecImg from "../../../assets/imgs/10255_alt1.jpeg";

import "./AccordionSpecification.css";

function AccordionSpecification() {
  return (
    <>
      <div className="acc-specification-container">
        <div className="acc-specification-content">
          <p>
            Take a trip to the amazing Assembly Square, developed to celebrate
            ten years of LEGO® Modular Buildings, featuring a wealth of
            unsurpassed, intricate details and hidden surprises. Easy-to-remove
            building sections provide access to the highly detailed interior,
            comprising a ground level with a bakery, florist’s shop and café, a
            middle level with a music store, photo studio and dental office, and
            an upper-level dance studio and apartment with access to a rooftop
            terrace with barbecue. The exterior of the building features a
            detailed sidewalk with outdoor café furniture, fountain, streetlamps
            and a highly elaborate facade with beautifully detailed windows and
            doors, three buildable shop signs, spired tower and a decorative
            roofline. Collect and build an entire town with the LEGO Creator
            Expert Modular Building series 10243 Parisian Restaurant, 10246
            Detective’s Office and 10251 Brick Bank. Includes eight minifigures
            and a baby figure.
          </p>
          <ul>
            <li>
              Includes eight minifigures: a dentist, barista, baker, florist,
              music store assistant, dancer, photographer and a LEGO® fan, plus
              a baby figure.
            </li>
            <li>
              The three-level Assembly Square features an authentic, elaborate
              facade with detailed windows and doors, three buildable shop
              signs, spired tower, decorative roofline and a rooftop terrace,
              plus a detailed tiled sidewalk with a fountain, outdoor café
              furniture and two streetlamps. The highly detailed interior
              includes a bakery, florist’s shop, café, music store, photo
              studio, dental office, apartment and a dance studio.
            </li>
            <li>
              Ground level features a bakery with counter, cash register,
              shelves, opening oven, wedding cake and assorted buildable
              pastries and treats; a florist’s shop with counter, cash register,
              garden tools, flower arrangements, bouquets and a blue and yellow
              macaw parrot element; and a café with espresso machine, counter,
              bench seating and pie elements.
            </li>
            <li>
              Middle level features a music store with a buildable drum set, two
              guitars and saxophone element; photo studio with buildable classic
              camera and adjustable tripod; and a dental office with buildable
              reclining chair, waiting area, telephone and a sink.
            </li>
            <li>
              Accessory elements include a ballerina skirt, Chihuahua, pretzel,
              ornamental chicken and candy. Also includes a buildable telephone,
              grill, baby carriage and buildable lamps.
            </li>
            <li>
              Remove the building sections to access the detailed interior.
            </li>
            <li>
              Remove the building sections to access the detailed interior.
            </li>
          </ul>
        </div>
        <div className="acc-specification-img">
          <img src={SpecImg} alt="" />
        </div>
      </div>
    </>
  );
}

export default AccordionSpecification;
