import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  const email = useRef("");
  const password = useRef("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const emailIsInValid = !emailValue.includes("@");
    const passwordIsInValid = passwordValue.length < 6;

    if (emailIsInValid) {
      setEmailError(true);
      return;
    }
    if (passwordIsInValid) {
      setPasswordError(true);
      return;
    }

    email.current.value = "";
    password.current.value = "";
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
              <form onSubmit={handleFormSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    ref={email}
                    className="form-control"
                    name="email"
                    id="email"
                  />
                  {emailError && (
                    <div className="invalid-feedback d-block">
                      Lütfen geçerli bir e-posta adresi girin.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    ref={password}
                    className="form-control"
                    name="password"
                    id="password"
                  />
                  {passwordError && (
                    <div className="invalid-feedback d-block">
                      Parola en az 6 karakter olmalıdır.
                    </div>
                  )}
                </div>
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
