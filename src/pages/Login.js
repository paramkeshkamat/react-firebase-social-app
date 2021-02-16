import { useContext } from "react";
import { auth, googleProvider } from "../firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import loginPageImage from "../assets/loginPageImage.svg";
import "../styles/Login.scss";

const Login = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const signIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(() => history.push("/"))
      .catch((err) => console.log(err.message));
  };

  if (currentUser) {
    history.push("/");
  }

  return (
    <div className="Login">
      <div className="svg-container">
        <img src={loginPageImage} alt="login page svg" />
      </div>
      <div className="sign-in-form">
        <button className="sign-in-btn" onClick={signIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
