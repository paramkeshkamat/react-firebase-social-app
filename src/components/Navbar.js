import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "../styles/Navbar.scss";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const redirect = setTimeout(() => {
      history.push("/");
    }, 8000);
    return () => clearTimeout(redirect, 8000);
  });

  return (
    <div className="Navbar">
      <nav>
        <h1>React Social</h1>
        <div className="user-details">
          {currentUser ? <Avatar src={currentUser.photoURL} /> : <Avatar />}
          <button className="sign-out-btn" onClick={() => auth.signOut()}>
            Sign out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
