import React from "react";
import "./CSS/LoginSignup.css";
import { useState } from "react";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const Login = async () => {
    const data = { ...FormData };
    const res = await fetch("http://localhost:3000/api/products/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data),
    }).then((res)=>  res.json())
    if (res.success) {
      alert("Login successfully");
      localStorage.setItem('auth-token',res.token)
       window.location.replace("/")
    } else {
      alert("Login failed: " + (res.message || "Unknown error"));
    }
  };

  const SignUp = async () => {
    const data = { ...FormData };
    const res = await fetch("http://localhost:3000/api/products/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data),
    }).then((res)=> res.json())


    if (res.success) {
      localStorage.setItem('auth-token',res.token)
      window.location.replace("/")
    } else {
      alert("SignUp failed: " + (res.message || "Unknown error"));
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              onChange={(e) => {
                setFormData({ ...FormData, [e.target.name]: e.target.value });
              }}
              name="name"
              value={FormData.name}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            onChange={(e) => {
              setFormData({ ...FormData, [e.target.name]: e.target.value });
            }}
            name="email"
            value={FormData.email}
            placeholder="Your Email"
          />
          <input
            type="password"
            onChange={(e) => {
              setFormData({ ...FormData, [e.target.name]: e.target.value });
            }}
            name="password"
            value={FormData.password}
            placeholder="Your Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? Login() : SignUp();
          }}
        >
          Continue
        </button>
        <p className="loginsignup-login">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Click here to Create Account!"}{" "}
          <span
            onClick={() => {
              setState(state === "Sign Up" ? "Login" : "Sign Up");
            }}
          >
            {state === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
