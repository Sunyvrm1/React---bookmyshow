import { useState, useEffect, useRef } from "react";

import Banner1 from "../assets/banner1.avif";
import Banner2 from "../assets/banner2.avif";
import Banner3 from "../assets/banner3.avif";
import Banner4 from "../assets/banner4.avif";

export default function Slider() {
  const bannerCarouselRef = useRef(null);
  const imageRef = useRef(null);

  const [bannerWidth, setBannerWidth] = useState(0);

  useEffect(() => {
    if (imageRef.current) {
      setBannerWidth(imageRef.current.clientWidth);
    }
  }, []);

  function handleClick(direction) {
    const bannerCarousel = bannerCarouselRef.current;
    const scrollAmount =
      direction === "left" ? -bannerWidth - 10 : bannerWidth + 10;

    if (bannerCarousel) {
      bannerCarousel.scrollLeft += scrollAmount;
    }
  }
  return (
    <>
      <div className="banner">
        <div className="boxWidth">
          <div className="bannerCarousel" ref={bannerCarouselRef}>
            <img ref={imageRef} src={Banner1} alt="" className="imageBanner" />
            <img src={Banner2} alt="" className="imageBanner" />
            <img src={Banner3} alt="" className="imageBanner" />
            <img src={Banner4} alt="" className="imageBanner" />
          </div>
          <button
            className="bannerBtn bannerBtnLeft"
            id="left"
            onClick={() => handleClick("left")}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button
            className="bannerBtn bannerBtnRight"
            id="right"
            onClick={() => handleClick("right")}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
