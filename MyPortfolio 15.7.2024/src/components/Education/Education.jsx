import React from "react";
import "./Education.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import Buet from "../../img/Buet.svg";
import Ahc from "../../img/Ahc.png";
import Biam from "../../img/Biam.png";

const Education = () => {
  const clients = [
    {
      img: Buet,
      review1:
        "Bachelor of Science",
      review2:
       " Material & Metallurgical Engineering (MME)",
      review3:
        "Bangladesh University of Engineering and Technology (BUET)",
    },
    {
      img: Ahc,
      review1:
        "Higher Secondary Certificate (HSC)",
      review2:
        "Board Schoolership (2017)",
      review3:
        "Govt. Azizul Hoque College",
    },
    {
      img: Biam,
      review1:
        "Secondary School Certificate (SSC)",
      review2:
      "Golden A+ (GPA 5)",
      review3:
      "Biam Model School and College",
    },
  ];

  return (
    <div className="e-wrapper" id="education">
      <div className="e-heading">
        <span>Educational Background </span>
      <div className="blur t-blur1" style={{ background: "var(--purple)" }}></div>
      <div className="blur t-blur2" style={{ background: "skyblue" }}></div>

      </div>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {clients.map((client, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="education">
                <img src={client.img} alt="" />
                <span>{client.review1}</span>
                <span>{client.review2}</span>
                <span>{client.review3}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Education;
