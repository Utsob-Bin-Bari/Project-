import React, { useContext } from "react";
import "./Portfolio.css";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import tuitionLagbe from "../../img/tuitionLagbe.png";
import memoryBook from "../../img/memeoryBook.png";
import adminPanel from "../../img/adminPanel.jpeg";
import { themeContext } from "../../Context";
const Portfolio = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="portfolio" id="portfolio">
      <span style={{color: darkMode?'white': ''}}>Recent Projects</span>
      <span>Portfolio</span>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        grabCursor={true}
        className="portfolio-slider"
      >
        <SwiperSlide>
          <img src={tuitionLagbe} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={memoryBook} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={adminPanel} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Portfolio;
