import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "../utils/authUtils";

function PrivateRoute({ children }) {
  return isLogin() ? children : <Navigate to="/" />;
}

export default PrivateRoute;
