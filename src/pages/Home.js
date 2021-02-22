import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ImageUpload from "../components/ImageUpload";
import Posts from "../components/Posts";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const Home = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behaviour: "smooth" });
  };

  useEffect(() => {
    const scrollTop = () => {
      if (window.scrollY > 100) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener("scroll", scrollTop);
    return () => window.removeEventListener("scroll", scrollTop);
  }, []);

  return (
    <div>
      <Navbar />
      <ImageUpload />
      <Posts />
      <button
        className={`scrollToTop ${!showScrollToTop && "hide-btn"}`}
        onClick={scrollTop}
      >
        <KeyboardArrowUpIcon />
      </button>
    </div>
  );
};

export default Home;
