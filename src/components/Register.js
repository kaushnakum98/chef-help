import React, { useState } from "react";
import register from "../Media/register.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerUser } from "../api/api";
import { Redirect } from "react-router";

const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (redirect) {
    return <Redirect to="/join" />;
  }

  return (
    <section className={`register container`}>
      <section className={`register__content`}>
        <div>
          <img src={register} alt="register"></img>
        </div>
      </section>

      <Formik
        initialValues={{ email: "", password: "", repassword: "", name: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password is Required";
          }
          if (!values.repassword) {
            errors.repassword = "Please Re-enter Password";
          }

          if (values.password !== values.repassword) {
            errors.password = errors.repassword = "both password should match";
          }

          if (!values.name) {
            errors.name = "Name is Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const bodyData = {
            email: values.email,
            name: values.name,
            password: values.password,
          };

          const response = await registerUser(bodyData);

          if (response.data && response.status === 200) {
            setRedirect(true);
          }

          if (response.response.data) {
            setErrorMessage(response.response.data);
          }

          // if (response && response.status === 200) {
          //   // createCookieInHour("jwt", response.data.token);
          // } else if (response.response) {
          //   const res = response.response;
          //   if (res.status === 401) {
          //     setErrorMessage(res.data);
          //   }
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="register__form">
            <div className="register__input">
              <label>Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className="register__input">
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="register__input">
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div className="register__input">
              <label>Password:</label>
              <Field type="password" name="repassword" />
              <ErrorMessage name="repassword" component="div" />
            </div>

            <button
              className="register__input"
              type="submit"
              disabled={isSubmitting}
            >
              Register
            </button>
            <ErrorMessage name="errors" component="div" />
            <div className="register__input">
              <a href="/join">User? Sign in here</a>
            </div>
            <label>{errorMessage}</label>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Register;
