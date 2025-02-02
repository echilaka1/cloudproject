import React, { useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import InputField from "../../../components/inputField";
import makeAPICall from "../../../utils/apiUtils";
import history from "../../../utils/history";
import { AUTH_TOKEN, REDIRECT_URL } from "../../../utils/constants";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  function handleChangeInput(event) {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = () => {
    const data = {
      email: inputValues.email,
      password: inputValues.password,
    };
    setLoading(true);
    return makeAPICall({
      path: "auth/login",
      payload: data,
      method: "POST",
    })
      .then((res) => {
        setLoading(false);
        window.localStorage.setItem("email", inputValues.email);
        window.localStorage.setItem(AUTH_TOKEN, res?.token);
        const redirectUrl =
          window.sessionStorage.getItem(REDIRECT_URL) ?? "/dashboard";
        history.push(redirectUrl);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message, "login error");
      });
  };

  return (
    <section className="step-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="row remove-p bg-white">
              <div className="col-md-4">
                <div className="step-div p-5">
                  <div>
                    <h1 className="login-welcome mt-5">Welcome Back</h1>
                    <p className="login-welcome-details">
                      Login to your profile
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="content-div p-5">
                  <div className="first-signup">
                    <h1 className="mb-4">Enter your login details</h1>
                    <div>
                      <h2 className="mb-1">Email</h2>
                      <InputField
                        type="email"
                        value={inputValues.email}
                        onChange={handleChangeInput}
                        name="email"
                        placeholder="example@mail.com"
                      />
                    </div>

                    <div>
                      <h2 className="mb-1">Password</h2>
                      <InputField
                        type="password"
                        value={inputValues.password}
                        onChange={handleChangeInput}
                        name="password"
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!(inputValues.password && inputValues.email)}
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                        marginTop: "20px",
                      }}
                    >
                      {loading ? "Loading..." : "Login"}
                    </Button>
                    <div className="text-center mt-3">
                      <p>
                        Don't have an account?{" "}
                        <Link to="/signup">
                          <span className="orange">Register</span>
                        </Link>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
