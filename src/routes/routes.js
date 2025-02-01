import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/signup";
import Dashboard from "../pages/dashboard";
import PrivateRoute from "./privateRoute";

const AllPages = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/signup" element={<Register />}></Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AllPages;
