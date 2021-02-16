import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import pageNotFound from "../assets/pageNotFound.svg";
import "../styles/ErrorPage.scss";

const ErrorPage = () => {
  const history = useHistory();

  return (
    <div className="ErrorPage">
      <Navbar />
      <div className="error">
        <img src={pageNotFound} alt="404 error" />
        <p>This page cound not be found!</p>
        <p>
          Go back to <span onClick={() => history.push("/")}>home page</span>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
