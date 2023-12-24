import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import API_URL from "../config/global";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email Address").required("Email is required"),
  password: yup.string().min(3, "Password must be 3 characters at minimum").required("Password is required"),
});

function Login() {
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${API_URL}/authenticate`, values);
  
      if (response.data.token) {
        alert("Logged in successfully");
        // Redirect to a logged-in page or perform other actions
        navigate("/loggedin");
      } else {
        alert("Username or Password is Incorrect");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  
    setSubmitting(false);
  };

  return (
    <div className="body">
      <div className="container d-flex align-items-center justify-content-center">
        <div className="card">
          <div className="card-body">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {(formikProps) => (
                <form onSubmit={formikProps.handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className={`form-control ${loginError ? "is-invalid" : ""}`}
                      placeholder="Email"
                      name="email"
                      id="email"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.email}
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <input
                      type="password"
                      className={`form-control ${loginError ? "is-invalid" : ""}`}
                      placeholder="Password"
                      name="password"
                      id="password"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.password}
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="button"
                      disabled={!formikProps.isValid || formikProps.isSubmitting}
                    >
                      Login
                    </button>
                  </div>
                  <Link to="/reset" className="btn">
                    Forget Password?
                  </Link>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
