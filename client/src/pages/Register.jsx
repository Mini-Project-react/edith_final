import lock from "./lock.png";
import userImg from "./user.png";
import mail from "./mail.png";

import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../routes";

import { useState } from "react";
import axios from "axios";
import { getUserRegisterApi } from "../helper";
import { register } from "../features/userReducer";
import { useDispatch } from "react-redux";

export default function Register(props) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  let isInValid = !pass || !email || !userName;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();
    if (!isInValid) {
      axios
        .post(getUserRegisterApi(), {
          name: userName,
          password: pass,
          email,
        })
        .then(({ data }) => {
          if (data.error) {
            setError(data.error.message);
          } else {
            dispatch(
              register({ displayName: userName, email, userId: data.userId })
            );
            navigate("/");
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      alert("check the fields");
    }
    console.log("register instance");
  };
  return (
    <section>
      <div className="box">
        <div className="form">
          <h2>Register</h2>
          <form>
            <div className="inputBx">
              <input
                type="text"
                placeholder="username"
                name="name"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
              <img src={userImg} alt="user"></img>
            </div>

            <div className="inputBx">
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <img src={mail} alt="user"></img>
            </div>

            <div className="inputBx">
              <input
                type="password"
                placeholder="password"
                name="password"
                required
                onChange={(e) => setPass(e.target.value)}
              />
              <img src={lock} alt="lock"></img>
            </div>

            <div className="inputBx">
              <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => {
                  isInValid = e.target.value !== pass;
                }}
              />
              <img src={lock} alt="lock"></img>
            </div>

            <div className="flex w-full space-x-2 mb-2">
              <input
                className="rounded-md px-4 py-2  text-white-light transform-gpu transition-all  duration-150 hover:text-gray-800 hover:-translate-y-0.5 flex flex-nowrap w-fit space-x-2 items-center border border-opacity-60"
                type="submit"
                value="sign-up"
                placeholder="Sign-up"
                onClick={handleForm}
              />
              <button
                className="rounded-md px-4 py-2  text-white-light transform-gpu transition-all  duration-150 hover:text-gray-800 hover:-translate-y-0.5 flex flex-nowrap w-fit space-x-2 items-center border border-opacity-60"
                onClick={async () => {
                  // register part
                }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  className="svg-inline--fa fa-google w-6 h-6"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                <h1 className="">sigin-in</h1>
              </button>
            </div>
          </form>
          <p className="font-medium underline">{error}</p>
          <div className="group space-x-2">
            <p className="inline-flex">have an account?</p>
            <Link to="/login">login</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
