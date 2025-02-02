import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN } from "./constants";
import history from "./history";

export const isLogin = () => {
  let token = window.localStorage.getItem(AUTH_TOKEN);
  return !!token && !isSessionExpired(token);
};

export const isSessionExpired = (token) => {
  if (!token) {
    return false;
  }
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return true;
  }
};

export const logout = () => {
  window.localStorage.removeItem(AUTH_TOKEN);
  window.localStorage.removeItem("email");
  history.push("/");
  window.location.reload();
};
