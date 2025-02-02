import React, { useState, useEffect } from "react";
import InputField from "../../../components/inputField";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import makeAPICall from "../../../utils/apiUtils";
import { ReactComponent as Check } from "../../../assets/images/password-check-active.svg";
import { ReactComponent as Uncheck } from "../../../assets/images/password-check-inactive.svg";
import PasswordStrengthBar from "react-password-strength-bar";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordTwo: "",
  });
  const [file, setFile] = useState(null);
  const [isMin, setIsMin] = useState(false);
  const [isAlphaNum, setIsAlphNum] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(false);
  const [isSpecialCharacter, setIsSpecialCharacter] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChangeInput(event) {
    if (event.target.name === "file") {
      setFile(event.target.files[0]);
    } else {
      setInputValues({
        ...inputValues,
        [event.target.name]: event.target.value,
      });
    }
  }

  function signUp() {
    const data = {
      email: inputValues.email,
      password: inputValues.password,
      firstname: inputValues.first_name,
      lastname: inputValues.last_name,
      image: file,
    };
    setLoading(true);
    return makeAPICall({
      path: "auth/register",
      payload: data,
      method: "POST",
    })
      .then((res) => {
        setInputValues({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          passwordTwo: "",
        });
        setFile(null);
        setLoading(false);
        setSuccess(true);
        console.log(res, "registering successful");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message, "registration error");
      });
  }

  useEffect(() => {
    if (
      inputValues.password !== "" &&
      inputValues.passwordTwo !== "" &&
      inputValues.password === inputValues.passwordTwo
    ) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [inputValues.password, inputValues.passwordTwo]);

  useEffect(() => {
    if (
      isMin &&
      isAlphaNum &&
      isMatch &&
      isLowerCase &&
      isSpecialCharacter &&
      isUpperCase
    ) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [
    isMin,
    isAlphaNum,
    isMatch,
    isLowerCase,
    isSpecialCharacter,
    isUpperCase,
  ]);

  useEffect(() => {
    const pass = inputValues.password;
    const reg = /[!@#$%^&*(),.?":{}|<>]/g;
    const test = reg.test(pass);
    if (test) {
      setIsSpecialCharacter(true);
    } else {
      setIsSpecialCharacter(false);
    }
  }, [inputValues.password]);

  useEffect(() => {
    const pass = inputValues.password;
    const reg = /[0-9]/g;
    const test = reg.test(pass);
    if (test) {
      setIsAlphNum(true);
    } else {
      setIsAlphNum(false);
    }
  }, [inputValues.password]);

  useEffect(() => {
    const pass = inputValues.password;
    if (pass.length < 6) {
      setIsMin(false);
    } else {
      setIsMin(true);
    }
  }, [inputValues.password]);

  useEffect(() => {
    const pass = inputValues.password;
    const uppercaseReg = /[A-Z]/g;
    const uppercaseTest = uppercaseReg.test(pass);
    if (uppercaseTest) {
      setIsUpperCase(true);
    } else {
      setIsUpperCase(false);
    }
  }, [inputValues.password]);

  useEffect(() => {
    const pass = inputValues.password;
    const lowercaseReg = /[a-z]/g;
    const lowercaseTest = lowercaseReg.test(pass);
    if (lowercaseTest) {
      setIsLowerCase(true);
    } else {
      setIsLowerCase(false);
    }
  }, [inputValues.password]);

  return (
    <section className="step-bg">
      <div className="container">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="row remove-p bg-white">
              <div class="col-md-4">
                <div class="step-div p-5">
                  <div>
                    <h1 class="login-welcome mt-5">Sign up for free today</h1>
                    <p class="login-welcome-details">
                      Start uploading pictures to your s3
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="content-div p-5">
                  <div className="first-signup">
                    <h1 className="mb-4">
                      Tell us a bit about{" "}
                      <span className="orange">yourself</span>
                    </h1>
                    <div>
                      <h2 className="mb-1">First Name</h2>
                      <InputField
                        type="text"
                        value={inputValues.first_name}
                        onChange={handleChangeInput}
                        name="first_name"
                        placeholder="Femi"
                      />
                    </div>
                    <div>
                      <h2 className="mb-1">Last Name</h2>
                      <InputField
                        type="text"
                        value={inputValues.last_name}
                        onChange={handleChangeInput}
                        name="last_name"
                        placeholder="Adeyemi"
                      />
                    </div>
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
                      <h2 className="mb-1">Upload image</h2>
                      <InputField
                        type="file"
                        onChange={handleChangeInput}
                        className="file-input"
                        name="file"
                        accept="image/*"
                      />
                    </div>
                    <div>
                      <h2 className="mb-1">Enter Password</h2>
                      <InputField
                        type="password"
                        value={inputValues.password}
                        onChange={handleChangeInput}
                        name="password"
                      />
                    </div>

                    <div>
                      <h2 className="mb-1">Confirm Password</h2>
                      <InputField
                        type="password"
                        value={inputValues.passwordTwo}
                        onChange={handleChangeInput}
                        name="passwordTwo"
                      />
                    </div>
                    <PasswordStrengthBar
                      className="password__checker"
                      password={inputValues.password}
                    />
                    {inputValues.password.length > 0 && (
                      <ul className="card-check color-black no-card--check">
                        <li
                          className={`flex password__check--text ${
                            isMin ? "isTrue" : ""
                          }`}
                        >
                          <span className="me-2">
                            {isMin ? <Check /> : <Uncheck />}
                          </span>
                          At least 6 characters
                        </li>
                        <li
                          className={`flex password__check--text ${
                            isMin ? "isTrue" : ""
                          }`}
                        >
                          <span className="me-2">
                            {isUpperCase ? <Check /> : <Uncheck />}
                          </span>
                          A capital / uppercase letter
                        </li>
                        <li
                          className={`flex password__check--text ${
                            isMin ? "isTrue" : ""
                          }`}
                        >
                          <span className="me-2">
                            {isLowerCase ? <Check /> : <Uncheck />}
                          </span>
                          A lowercase letter
                        </li>
                        <li
                          className={`flex password__check--text ${
                            isAlphaNum ? "isTrue" : ""
                          }`}
                        >
                          <span className="me-2">
                            {isAlphaNum ? <Check /> : <Uncheck />}
                          </span>
                          Contains at least one number
                        </li>
                        <li
                          className={`flex password__check--text ${
                            isMatch ? "isTrue" : ""
                          }`}
                        >
                          <span className="me-2">
                            {isMatch ? <Check /> : <Uncheck />}
                          </span>
                          Match with your confirm password
                        </li>
                        <li
                          className={`flex password__check--text ${
                            isAlphaNum ? "isTrue" : ""
                          }`}
                        >
                          <span className="me-2">
                            {isSpecialCharacter ? <Check /> : <Uncheck />}
                          </span>
                          A special character e.g, %, @, $
                        </li>
                      </ul>
                    )}

                    <Button
                      type="button"
                      onClick={signUp}
                      disabled={
                        !(
                          inputValues.first_name.trim() &&
                          inputValues.last_name.trim() &&
                          inputValues.email.trim() &&
                          inputValues.password.trim() &&
                          inputValues.passwordTwo.trim() &&
                          file
                        ) || !isAuthorized
                      }
                      style={{ width: "100%", borderRadius: "10px" }}
                    >
                      {loading ? "Loading" : "Register"}
                    </Button>
                    <br />
                    <br />
                    {success && (
                      <div className="success-message">
                        Registration successful! Please click on login below to
                        login to your account.
                      </div>
                    )}

                    <div className="text-center mt-3">
                      <p>
                        Already have an account?{" "}
                        <Link to="/">
                          <span className="orange">Login</span>
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
