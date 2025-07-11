import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Register() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("name"));
    console.log(formData.getAll("hobbies"));

    const hobbies = formData.getAll("hobbies");
    const data = Object.fromEntries(formData.entries());
    data.hobbies = hobbies;
    console.log(data);
  }
  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-7 mx-auto">
          <div className={`card border ${cardColor}`}>
            <div className="card-header">
              <h1 className="h4 mb-0">Register</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="row">
                  <div className="col md-6">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                      />
                    </div>
                  </div>
                  <div className="col md-6">
                    <div className="mb-3">
                      <label htmlFor="repassword" className="form-label">
                        Re-Password
                      </label>
                      <input
                        type="repassword"
                        className="form-control"
                        name="repassword"
                        id="repassword"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="hobbies" className="form-label">
                      Hobbies
                    </label>
                    <div className={`card card-body border ${cardColor}`}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="hobbies"
                          id="cars"
                          className="form-check-input"
                          value="cars"
                        />
                        <label htmlFor="cars" className="form-check-label">
                          Cars
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="hobbies"
                          id="books"
                          className="form-check-input"
                          value="books"
                        />
                        <label htmlFor="books" className="form-check-label">
                          Books
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="hobbies"
                          id="movies"
                          className="form-check-input"
                          value="movies"
                        />
                        <label htmlFor="movies" className="form-check-label">
                          Movies
                        </label>
                      </div>
                    </div>
                  </div>
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
