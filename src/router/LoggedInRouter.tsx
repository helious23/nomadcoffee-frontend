import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../routes";
import NotFound from "../screens/NotFound";
import Home from "../screens/Home";
import Layout from "../components/Layout";
import MainImage from "../screens/MainImage";
import Profile from "../screens/Profile";
import ShopDetail from "../screens/ShopDetail";
import CreateCafe from "../screens/CreateCafe";

const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.home} exact>
          <MainImage />
          <Layout screen="other">
            <Home />
          </Layout>
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
        <Route path={routes.createCafe}>
          <Layout screen="other">
            <CreateCafe />
          </Layout>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
