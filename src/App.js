import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import { AuthContext } from "./context/authContext";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {currentUser ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login" component={Login} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
