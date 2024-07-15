import React from "react";
import "./OtherSkills.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

import management from "../../img/management.jpg";
import monkeyType from "../../img/monkeyType.png";
import language from "../../img/language.jpg";
import gamming from "../../img/gamming.jpg";
import problem from "../../img/problem.jpg";
import volleyBall from "../../img/volleyball.jpg";

const OtherSkills = () => {
  const clients = [
    {
    img: problem,
    review1:
        "Problem Solving",
    review2:
        "Participating Competitive Programming for 2+ year ",
    review3:
        "Has deep knowledge of Data Structure & Algorithms",
    },
    {
      img: monkeyType,
      review1:
        "Typing",
      review2:
      "Can Type upto 100 WPM",
      review3:
      "Can maintain 80 WPM for a prolonged period",
    },
    {
      img: language,
      review1:
      "Language",
      review2:
      "Can write and speak Bangla & English fluently",
      review3:
      "Can understand and carry small talk in Hindy",
    },
    {
      img: volleyBall,
      review1:
        "Leadership & Communication",
      review2:
       "Play as captain on Titumir hall Volleyball Team 2023",
      review3:
        "Lead BUET Titumir Hall Athletics Team 2023",
    },
    {
      img: management,
      review1:
        "People Management",
      review2:
        "Served as a mess manager of Titumir hall",
      review3:
        "Fimiliar with corporate enviornment",
    },
    
    {
        img: gamming,
        review1:
        "Competitive & Puntual",
        review2:
        "Participate eSport for 3 years",
        review3:
        "Represented Bangladesh at International Level PMNC 2022",
    },
    
    
  ];

  return (
    <div className="e-wrapper" id="education">
      <div className="e-heading">
        <span>Other Skills</span>
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
                <span className="review1">{client.review1}</span>
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

export default OtherSkills;