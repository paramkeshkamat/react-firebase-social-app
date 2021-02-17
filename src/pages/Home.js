import { useContext } from "react";
import Navbar from "../components/Navbar";
import ImageUpload from "../components/ImageUpload";
import Posts from "../components/Posts";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  if (!currentUser) {
    history.push("/login");
  }

  return (
    <div>
      <Navbar />
      <ImageUpload />
      <Posts />
    </div>
  );
};

export default Home;
