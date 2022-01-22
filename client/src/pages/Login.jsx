import lock from "./lock.png";
import userImg from "./user.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { getUserLogin } from "../helper";
import { register } from "../features/userReducer";
import { useDispatch } from "react-redux";

function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  let isNotValid = !email && !pass;

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();

    if (isNotValid) {
      alert("check the field and try again");
    } else
      axios
        .post(getUserLogin(), {
          email,
          password: pass,
        })
        .then((res) => {
          if (!res.data.error) {
            
            dispatch(register(res.data));
            navigate("/");
          } else setErr(res.data.error.message);
        })
        .catch((err) => console.log(err));
  };
  return (
    <section className="section">
      <div className="box">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="inputBx">
              <input
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                autoComplete="true"
              />
              <img src={userImg} alt="user"></img>
            </div>

            <div className="inputBx">
              <input
                type="password"
                placeholder="password"
                required
                value={pass}
                onChange={({ target }) => setPass(target.value)}
              />
              <img src={lock} alt="lock"></img>
            </div>

            <label className="flex space-x-2 items-center mb-2">
              <input type="checkbox" className="mt-1" />
              <p className="inline-flex">remember me</p>
            </label>

            <div className="flex w-full space-x-2 mb-2">
              <input
                className="rounded-md px-4 py-2  text-white-light transform-gpu transition-all  duration-150 hover:text-gray-800 hover:-translate-y-0.5 flex flex-nowrap w-fit space-x-2 items-center border border-opacity-60"
                type="submit"
                value="Log in"
                placeholder="Login"
              />
            </div>
          </form>
          <p className="underline font-medium">{err}</p>
          <p>
            forget <a href="/">password?</a>
          </p>
          <Link to="/register">create new account!</Link>
        </div>
      </div>
    </section>
  );
}
export default Login;
