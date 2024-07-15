import React, { useContext, useEffect, useState } from "react";
import { themeContext } from "../../Context";
import axios from "axios";
import "./CP.css";

const CP = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [codeforcesRating, setCodeforcesRating] = useState(null);
  const [codechefRating, setCodechefRating] = useState(null);

  useEffect(() => {
    axios.get("https://codeforces.com/api/user.info?handles=Godspeed_17")
      .then(response => {
        if (response.data.result && response.data.result.length > 0) {
          setCodeforcesRating(response.data.result[0].rating);
        } else {
          setCodeforcesRating("N/A");
        }
      })
      .catch(error => {
        console.error("Error fetching Codeforces rating:", error);
        setCodeforcesRating("Error");
      });

    axios.get("https://competitive-coding-api.herokuapp.com/api/codechef/godspeed_17")
      .then(response => {
        if (response.data.rating) {
          setCodechefRating(response.data.rating);
        } else {
          setCodechefRating("N/A");
        }
      })
      .catch(error => {
        console.error("Error fetching CodeChef rating:", error);
        setCodechefRating("Error");
      });
  }, []);

  return (
    <div className="experience" id="CP">
      <div className="achievement">
        <div className="circle" style={{color: darkMode ? 'var(--orange)' : ''}}>2+</div>
        <span style={{color: darkMode ? 'white' : ''}}>Years: 2022-2024</span>
        <span className="weight">Competitive</span>
        <span className="weight">Programming</span>
      </div>
      <div className="achievement">
        <div className="circle" style={{color: darkMode ? 'var(--orange)' : ''}}>{codechefRating !== null && codechefRating>1623 ? codechefRating : "1623"}</div>
        <span style={{color: darkMode ? 'white' : ''}}>CodeChef</span>
        <a href="https://www.codechef.com/users/godspeed_17" target="_blank" rel="noopener noreferrer">
          <button className="button s-button">Check</button>
        </a>
      </div>
      <div className="achievement">
        <div className="circle" style={{color: darkMode ? 'var(--orange)' : ''}}>{codeforcesRating !== null && codeforcesRating>1287 ? codeforcesRating : "1287"}</div>
        <span style={{color: darkMode ? 'white' : ''}}>Codeforces</span>
        <a href="https://codeforces.com/profile/Godspeed_17" target="_blank" rel="noopener noreferrer">
          <button className="button s-button">Check</button>
        </a>
      </div>
    </div>
  );
};

export default CP;
