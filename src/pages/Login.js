import { auth, googleProvider, facebookProvider } from "../firebase";
import { useHistory } from "react-router-dom";
import loginPageImage from "../assets/loginPageImage.svg";
import avatar from "../assets/avatar.svg";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import "../styles/Login.scss";

const Login = () => {
  const history = useHistory();
  
  const GoogleSignIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(() => history.push("/"))
      .catch((err) => console.log(err.message));
  };

  const FacebookSignIn = () => {
    auth
      .signInWithPopup(facebookProvider)
      .then(() => history.push("/"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="Login">
      <div className="svg-container">
        <img src={loginPageImage} alt="login page svg" />
      </div>
      <div className="sign-in-form">
        <img src={avatar} alt="avatar" />
        <h2>Sign in</h2>
        <button className="sign-in-btn" onClick={GoogleSignIn}>
          <FaGoogle />
          &nbsp; Sign in with Google
        </button>
        <button className="facebook-btn sign-in-btn" onClick={FacebookSignIn}>
          <FaFacebookSquare />
          &nbsp; Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
