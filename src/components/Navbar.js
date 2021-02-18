import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { auth } from "../firebase";
import { Avatar } from "@material-ui/core";
import "../styles/Navbar.scss";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <nav>
        <div className="logo-container">
          <img src="/logo.png" alt="logo" />
          <h1>React Social</h1>
        </div>
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
