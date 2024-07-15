import React from "react";
import "./Postcard.css";

const Postcard = ({heading, detail, color}) => {
  return (
    <div className="card" style={{borderColor: {color}}}> 
      <span>{heading}</span>
      <span>{detail}</span>
    </div>
  );
};

export default Postcard;