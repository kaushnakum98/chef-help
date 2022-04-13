import React, { useState } from "react";
import { loginUser, createCookieInHour, getCookie } from "../api/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router";

const Login = ({ setusername }) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  if (redirect) {
    history.push("/");
    history.go(0);
  }

  return (
    <section className={`login container`}>
      <section className={`login__content  `}>
        <div>
          <h1 className="login__text">
            Let's
            <label className="login__accent"> COOK</label>
            <br />
            <span> something up</span>
          </h1>
        </div>
      </section>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await loginUser(values.email, values.password);
          if (response && response.status === 200) {
            createCookieInHour("userData", JSON.stringify(response.data));
            setRedirect(true);
          } else if (response.response) {
            const res = response.response;
            if (res.status === 401) {
              setErrorMessage(res.data);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="login__form">
            <div className="login__input">
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="login__input">
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button
              className="login__input"
              type="submit"
              disabled={isSubmitting}
            >
              Log in
            </button>
            <ErrorMessage name="errors" component="div" />
            <div className="login__input">
              <a href="/register">New User/ Register</a>
            </div>
            <label>{errorMessage}</label>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Login;
