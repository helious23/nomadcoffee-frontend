import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../routes";
import Home from "../screens/Home";
import Layout from "../components/Layout";
import MainImage from "../screens/MainImage";
import SignUp from "../screens/SignUp";
import NotFound from "../screens/NotFound";
import Login from "../screens/Login";

const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.home} exact>
          <>
            <MainImage />
            <Layout>
              <Home />
            </Layout>
          </>
        </Route>
        <Route path={routes.login}>
          <Login />
        </Route>
        <Route path={routes.signUp}>
          <SignUp />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
