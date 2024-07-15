import React, { useContext } from "react";
import "./DSA.css";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from 'react-scroll';
import Postcard from "../Card/Postcard";

const DSA = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const transition = {
    duration: 1,
    type: "spring",
  };

  return (
    <div className="services" id="DSA">
      <div className="design">
        <span style={{ color: darkMode ? "white" : "" }}>Highly efficient in</span>
        <span>Data Structure & Algorithms</span>
        <spane>
          With over two years of experience in competitive programming, I have developed a high proficiency<br/>
           in data structures and algorithms. This deep understanding allows me to provide alternative<br/>
           & more efficient solutions to optimize software memory consumption and reduce runtime.<br/>
          <br/>
        </spane>
        <a href="https://leetcode.com/u/Godspeed_17/" target="_blank" rel="noopener noreferrer">
          <button className="button s-button">LeetCode</button>
        </a>
        <div className="blur s-blur1" style={{ background: "#ABF1FF94" }}></div>
      </div>
      <div className="cards">
        <motion.div
          initial={{left: "4rem", top:"-5rem" }}
          whileInView={{ top: "0rem" }}
          transition={transition}
        >
          <Postcard
            heading={"Data Structure"}
            detail={"Array, Vector, Map, Set, Stack, Queue, Hash Table, Linked list, Tree, Graph, Adjacency list, Heap E.T.C"}
          />
        </motion.div>
        <motion.div
          initial={{ left: "-20rem", top: "15rem" }}
          whileInView={{ left: "-10rem", top: "15rem" }}
          transition={transition}
        >
          <Postcard
            heading={"Sorting Algorithms"}
            detail={"Bubble Sort, Insertion Sort, Merge Sort, Quick Sort, Bucket Sort & Intro sort."}
          />
        </motion.div>
        <motion.div
          initial={{ left: "25rem", top: "12rem" }}
          whileInView={{ left: "18rem"}}
          transition={transition}
        >
          <Postcard
            heading={"Others Algorithms"}
            detail={"Recursion, Backtracking, DFS, BFS, Tree Travarsal, Two pointer, Sliding Window, Greedy, Bit manipuation, Interval, Dijkstra, Knapsack E.T.C"}
          />
        </motion.div>
        <motion.div
          initial={{ top: "21rem", left: "4rem" }} 
          whileInView={{ top: "16.5rem" }}
          transition={transition}
        >
          <Postcard
            heading={"Searching Algorithms"}
            detail={"Linear Search, Binary Search & Interpolation Search"}
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

export default DSA;
