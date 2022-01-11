import lock from "./lock.png";
import userImg from "./user.png";

import * as ROUTES from "../constants/routes";
import { Link,  useNavigate } from "react-router-dom";
import React,  { useContext, useEffect, useState } from "react";
import axios from "axios";


function Login(props) {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    
  }, []);

  let isInValid = !pass || !email ;
  const handleForm = async (e) => {
    e.preventDefault();
    if (!isInValid) {
      axios
        .post("http://localhost:5000/api/users/index", {
          pass,
          email,
        })
        .then((res) => {
          console.log(res);
        });
      console.log("valied", isInValid);
      navigate(ROUTES.DASH_B);
    } else {
      console.log("not valid ", isInValid);
    }
  };

  return (
    <section>
      <div className="box">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleForm}>
            <div className="inputBx">
              <input type="email" placeholder="email" required name="email" onChange={(e) => setEmail(e.target.value)} />
              <img src={userImg} alt="user"></img>
            </div>

            <div className="inputBx">
              <input type="password" placeholder="password" required name="pass"  onChange={(e) => setPass(e.target.value)}/>
              <img src={lock} alt="lock"></img>
            </div>

            <label className="remember">
              <input type="checkbox" />
              remember me
            </label>

            <div className="inputBx">
              <input
                className="rounded-md px-4 py-2  text-white-light transform-gpu transition-all  duration-150 hover:text-gray-800 hover:-translate-y-0.5 flex flex-nowrap w-fit space-x-2 items-center border border-opacity-60"
                type="submit"
                value="submit"
                placeholder="Login"
                onClick={handleForm}
              />
            </div>
          </form>
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
