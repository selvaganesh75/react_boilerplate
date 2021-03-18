import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./App.scss";
import routes from "./routes";
import { PrivateRoute } from "./Routing/private-route";
import { history } from "./store/store";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Pages
const Login = React.lazy(() => import("./views/login/login"));
const NotFound = React.lazy(() => import("./views/404/index"));

class App extends Component {
  state = {
    bgImg: require("./assets/bg_low.jpg"),
  };

  componentDidMount() {
    const img = new Image();
    img.src = require("./assets/bg_med.png");
    img.onload = () => {
      this.setState({ bgImg: img.src });
    };
  }

  render() {
    return (
      <>
        <div className="bg">
          <img src={this.state.bgImg} />
        </div>

        <Router history={history}>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/login" component={Login} />
              {routes.map((route) => (
                <PrivateRoute {...route} />
              ))}
              <Route
                name="Page 404"
                render={(props) => <NotFound {...props} />}
              />
            </Switch>
          </React.Suspense>
        </Router>
      </>
    );
  }
}

export default App;
