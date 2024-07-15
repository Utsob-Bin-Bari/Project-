import React, { useContext } from "react";
import "./Services.css";
import Card from "../Card/Card";
import react from "../../img/react.svg";
import springBoot from "../../img/springBoot.svg";
import api from "../../img/api.png";

import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import Resume from './resume.pdf';

const Services = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const transition = {
    duration: 1,
    type: "spring",
  };

  return (
    <div className="services" id="services">
      <div className="design">
        <span style={{ color: darkMode ? "white" : "" }}>All of my</span>
        <span>Services</span>
        <spane>
          Full-Stack website and mobile apps for Android and iOS using React/React Native for FrontEnd
          <br />
          and Spring Boot with oAuth2 as a BackEnd with a sclable Data Base using My SQL.<br/>
          <br/>
        </spane>
        <a href={Resume} download>
          <button className="button s-button">Download CV</button>
        </a>
        <div className="blur s-blur1" style={{ background: "#ABF1FF94" }}></div>
      </div>
      <div className="cards">
        <motion.div
          initial={{ left: "25rem" }}
          whileInView={{ left: "14rem" }}
          transition={transition}
        >
          <Card
            emoji={react}
            heading={"FrontEnd"}
            detail={"React Native, React, JavaScript, Html, CSS, Expo, Vite.js"}
          />
        </motion.div>
        <motion.div
          initial={{ left: "-11rem", top: "12rem" }}
          whileInView={{ left: "-4rem" }}
          transition={transition}
        >
          <Card
            emoji={springBoot}
            heading={"BackEnd"}
            detail={"Spring Boot, Java, Maven, JPA, Lombok, oAuth 2"}
          />
        </motion.div>
        <motion.div
          initial={{ top: "19rem", left: "25rem" }}
          whileInView={{ left: "12rem" }}
          transition={transition}
        >
          <Card
            emoji={api}
            heading={"DataBase and API"}
            detail={
              "My SQL, Axios, RESTful API with JWT Token"
            }
            color="rgba(252, 166, 31, 0.45)"
          />
        </motion.div>
        <div
          className="blur s-blur2"
          style={{ background: "var(--purple)" }}
        ></div>
      </div>
    </div>
  );
};

export default Services;
