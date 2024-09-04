import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    user_name: "",
  });

  const { email, password, user_name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, user_name };
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const resParse = await response.json();
      if (resParse.token) {
        localStorage.setItem("token", resParse.token);
        setAuth(true);
        toast.success("Registered successfully!");
      } else {
        setAuth(false);
        toast.error(resParse);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>

      <form className="container" onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          //   onChange={(e) => onChange(e)}
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          //   onChange={(e) => onChange(e)}
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="user_name"
          value={user_name}
          placeholder="name"
          //   onChange={(e) => onChange(e)}
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <button className="form-control btn btn-success btn-block">
          Submit
        </button>
      </form>
      <div className="d-flex justify-content-center my-3">
        <p>Already have an account? </p>
        <Link to="/login" className="mx-1">
          Log in
        </Link>
      </div>
    </Fragment>
  );
};

export default Register;
