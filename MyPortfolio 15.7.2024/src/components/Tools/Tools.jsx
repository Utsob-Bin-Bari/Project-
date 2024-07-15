import React, { useContext } from "react";
import "./Tools.css";
import androidStudio from "../../img/androidStudio.png";
import postman from "../../img/postman.png";
import springToolSuits4 from "../../img/springToolSuits4.png";
import visualStudio from "../../img/visualStudio.png";
import xCode from "../../img/xCode.svg";
import mysql from "../../img/mysql.png";
import github from "../../img/gitHubBig.png";
import sourceTree from "../../img/sourceTree.png";
import ecilpse from "../../img/ecilpse.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import {Link} from 'react-scroll';
const Tools = () => {

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;


  return (
    <div className="tools" id="tools">
      <div className="t-left">
        <div className="design">
          <span style={{ color: darkMode ? "white" : "" }}>
             Highly proficient in utilizing
          </span>
          <span>Development & Testing Tools</span>
          <spane>
            Integrated Development Environment - Visual Studio Code & Spring Tool Suits 4
            <br />
            Simulator and Emulator - xCode & Android Studio
            <br />
            Testing Tools - Postman & My SQL Workbench
            <br />
            DevOps tools - Git & Source Tree<br/>
            <br/>
          </spane>
          <Link to="contact" smooth={true} spy={true}>
            <button className="button s-button">Hire Me</button>
          </Link>
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>


      </div>
      <div className="t-right">
        <motion.div
          initial={{ rotate: 45 }}
          whileInView={{ rotate: 0 }}
          viewport={{ margin: "-40px" }}
          transition={{ duration: 3.5, type: "spring" }}
          className="t-mainCircle"
        >
          <div className="t-secCircle">
            <img src={visualStudio} alt="" />
          </div>
          <div className="t-secCircle">
            <img src={androidStudio} alt="" />
          </div>
          <div className="t-secCircle">
            <img src={springToolSuits4} alt="" />
          </div>
          <div className="t-secCircle">
            <img src={postman} alt="" />
          </div>
          <div className="t-secCircle">
            <img src={xCode} alt="" />
          </div>      
          <div className="t-secCircle">
            <img src={mysql} alt="" />
          </div> 
          <div className="t-secCircle">
            <img src={github} alt="" />
          </div> 
          <div className="t-secCircle">
            <img src={sourceTree} alt="" />
          </div> 
          <div className="t-secCircle">
            <img src={ecilpse} alt="" />
          </div> 
        </motion.div>
        <div className="t-backCircle blueCircle"></div>
        <div className="t-backCircle yellowCircle"></div>
      </div>
    </div>
  );
};

export default Tools;
