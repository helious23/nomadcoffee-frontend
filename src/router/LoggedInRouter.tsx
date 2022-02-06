import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../routes";
import NotFound from "../screens/NotFound";
import Home from "../screens/Home";
import Layout from "../components/Layout";
import MainImage from "../screens/MainImage";

const LoggedInRouter = () => {
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
