import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../routes";
import Home from "../screens/Home";
import Layout from "../components/Layout";
import MainImage from "../screens/MainImage";
import SignUp from "../screens/SignUp";
import NotFound from "../screens/NotFound";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import ShopDetail from "../screens/ShopDetail";

const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.home} exact>
          <>
            <MainImage />
            <Layout screen="other">
              <Home />
            </Layout>
          </>
        </Route>
        <Route path={routes.login} exact>
          <Login />
        </Route>
        <Route path={routes.signUp} exact>
          <SignUp />
        </Route>
        <Route path={routes.profile}>
          <Layout screen="other">
            <Profile />
          </Layout>
        </Route>
        <Route path={routes.shopDetail}>
          <Layout screen="shopDetail">
            <ShopDetail />
          </Layout>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
