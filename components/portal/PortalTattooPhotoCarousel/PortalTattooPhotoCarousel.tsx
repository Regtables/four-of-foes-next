"use client";

import React, { useState } from "react";
import Slider from "react-slick";

import styles from "./PortalTattooPhotoCarousel.module.scss";

import ImageTile from "@/components/images/ImageTile";

const PortalTattooPhotoCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const settings = {
    infinite: true,
    // speed: 1000,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    focusOnSelect: true,
    lazyLoading: true,

    beforeChange: (current: number, next: number) => setIndex(next),
  };

  return (
    <div className= {styles.carousel}>
      <Slider {...settings}>
        {images?.map((image: any, i: number) => (
          <div
            className={`${styles.image} ${i === index ? styles.active : ""}`}
            id={i === index ? styles.center : styles.aside}
            // onClick={() => index === i && handleImagePreviewToggle(image)}
          >
            <ImageTile image={image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PortalTattooPhotoCarousel;
