import React from "react";

const Login = React.lazy(() => import("./views/login/login"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Login" },
  { path: "/login", exact: true, name: "Login Screen", component: Login },
];

export default routes;
