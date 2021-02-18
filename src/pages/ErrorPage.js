import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import pageNotFound from "../assets/pageNotFound.svg";
import "../styles/ErrorPage.scss";

const ErrorPage = () => {
  const history = useHistory();

  useEffect(() => {
    const redirect = setTimeout(() => {
      history.push("/");
    }, 8000);
    return () => clearTimeout(redirect, 8000);
  });

  return (
    <div className="ErrorPage">
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
