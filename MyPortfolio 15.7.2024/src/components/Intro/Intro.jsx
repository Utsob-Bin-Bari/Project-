import React, { useContext } from "react";
import "./Intro.css";
import Vector1 from "../../img/Vector1.png";
import Vector2 from "../../img/Vector2.png";
import boy from "../../img/boy.png";
import web from "../../img/web.png";
import developer from "../../img/developer.png";
import idea from "../../img/idea.svg";
import FloatinDiv from "../FloatingDiv/FloatingDiv";
// import Github from "../../img/github.png";
// import LinkedIn from "../../img/linkedin.png";
// import Instagram from "../../img/instagram.png";
// import Facebook from "../../img/Facebook.png";
import Insta from "@iconscout/react-unicons/icons/uil-instagram";
import Facebook from "@iconscout/react-unicons/icons/uil-facebook";
import Github from "@iconscout/react-unicons/icons/uil-github";
import LinkedIn from "@iconscout/react-unicons/icons/uil-linkedin";
import WhatsApp from "@iconscout/react-unicons/icons/uil-whatsapp";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
const Intro = () => {
  const transition = { duration: 2, type: "spring" };
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="Intro" id="Intro">
      <div className="i-left">
        <div className="i-name">
          <span style={{ color: darkMode ? "white" : "" }}>Hey! I Am</span>
          <span>Utsob Bin Bari</span>
          <span>
          Full Stack Developer with project experience in designing and development with DSA expertics.
          </span>
        </div>
        <Link to="contact" smooth={true} spy={true}>
          <button className="button i-button">Hire me</button>
        </Link>
        <div className="f-icons">
          <a href="https://www.instagram.com/10_utsob?igsh=MWhscms4ZXhueTg0bw%3D%3D&utm_source=qr">
          <Insta color="var(--orange)"   size={"3rem"} />
          </a>
          <a href="https://www.facebook.com/utsob.binbari?mibextid=LQQJ4d">
          <Facebook color="var(--orange)" size={"3rem"} />
          </a>
          <a href="https://github.com/Utsob-Bin-Bari">
          <Github color="var(--orange)" size={"3rem"} />
          </a>
          <a href="https://www.linkedin.com/in/utsob-bin-bari-7106a3309/">
          <LinkedIn color="var(--orange)" size={"3rem"} />
          </a>
          <a href=" https://wa.me/+8801316312208">
          <WhatsApp color="var(--orange)" size={"3rem"} />
          </a>

        </div>
      </div>
      <div className="i-right">
        <img src={Vector1} alt="" />
        <img src={Vector2} alt="" />
        <img src={boy} alt="" />
        <motion.div
          initial={{ left: "-15%",top:"10"}}
          whileInView={{ left: "3%" }}
          transition={transition}
          className="floating-div"
        >
           <FloatinDiv img={idea} text1="Problem" text2="Solver" />
        </motion.div>

        <motion.div
          initial={{ top: "-4%", left: "74%" }}
          whileInView={{ left: "68%" }}
          transition={transition}
          className="floating-div"
        >
          <FloatinDiv img={developer} text1="Full-stack" text2="Developer" />
        </motion.div>

        {/* animation */}
        <motion.div
          initial={{ left: "9rem", top: "18rem" }}
          whileInView={{ left: "0rem" }}
          transition={transition}
          className="floating-div"
        >
          <FloatinDiv img={web} text1="Web and Mobile " text2="Apps development" />
        </motion.div>

        <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur"
          style={{
            background: "#C1F5FF",
            top: "17rem",
            width: "21rem",
            height: "11rem",
            left: "-9rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Intro;
