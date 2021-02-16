import { useContext } from "react";
import Navbar from "../components/Navbar";
import ImageUpload from "../components/ImageUpload";
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
    </div>
  );
};

export default Home;
