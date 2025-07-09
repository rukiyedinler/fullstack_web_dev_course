import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import isEmail, { hasMinLength, isNotEmpty } from "../utils/validations";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    hasError: paswordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleFormSubmit(e) {
    e.preventDefault();
    if (emailHasError || paswordHasError) {
      return;
    }
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-7 mx-auto">
          <div className={`card border ${cardColor}`}>
            <div className="card-header">
              <h1 className="h4 mb-0">Login</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <Input
                  id="email"
                  name="email"
                  labelText="Email"
                  error={emailHasError && "Geçerli bir email giriniz."}
                  type="email"
                  value={emailValue}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />

                <Input
                  id="password"
                  name="password"
                  labelText="Password"
                  error={
                    paswordHasError && "Parola en az 6 karakter olmalıdır."
                  }
                  type="password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                />

                <button className={`btn btn-outline-${btnColor}`}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
