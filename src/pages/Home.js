import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import ImageUpload from "../components/ImageUpload";
import Posts from "../components/Posts";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
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

  if (!currentUser) {
    history.push("/login");
  }

  return (
    <div>
      <Navbar />
      <ImageUpload />
      <Posts />
      <button
        className={`scrollToTop ${!showScrollToTop && "hide-btn"}`}
        onClick={scrollTop}
      >
        <ArrowUpwardIcon />
      </button>
    </div>
  );
};

export default Home;
