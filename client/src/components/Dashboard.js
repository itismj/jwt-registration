import React, { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Dashoard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:4000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const resParse = await response.json();
      setName(resParse.user_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!");
  };
  return (
    <Fragment>
      <h1>Dashoard</h1>
      <h4>Welcome to our website {name}</h4>
      <button className="btn btn-primary" onClick={(e) => logOut(e)}>
        Log out
      </button>
    </Fragment>
  );
};

export default Dashoard;
