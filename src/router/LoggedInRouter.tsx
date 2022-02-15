import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../routes";
import NotFound from "../screens/NotFound";
import Home from "../screens/Home";
import Layout from "../components/Layout";
import MainImage from "../screens/MainImage";
import Profile from "../screens/Profile";
import ShopDetail from "../screens/ShopDetail";
import CreateOrEditCoffeeShop from "../screens/CreateOrEditCoffeeShop";
import CreateOrEditComment from "../screens/CreateOrEditComment";
import EditProfile from "../screens/EditProfile";
import Category from "../screens/Category";

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
        <Route path={routes.profile} exact>
          <Layout screen="other">
            <Profile />
          </Layout>
        </Route>
        <Route path={routes.editProfile} exact>
          <Layout screen="other">
            <EditProfile />
          </Layout>
        </Route>
        <Route path={routes.shopDetail} exact>
          <Layout screen="shopDetail">
            <ShopDetail />
          </Layout>
        </Route>
        <Route path={routes.createCafe} exact>
          <Layout screen="other">
            <CreateOrEditCoffeeShop />
          </Layout>
        </Route>
        <Route path={routes.comment} exact>
          <Layout screen="comment">
            <CreateOrEditComment />
          </Layout>
        </Route>
        <Route path={routes.category} exact>
          <Layout screen="other">
            <Category />
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
