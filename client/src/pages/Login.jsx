import lock from "./lock.png";
import userImg from "./user.png";
import { Link } from "react-router-dom";
import React from "react";

class Login extends React.Component {
  render() {
    return (
      <section>
        <div className="box">
          <div className="form">
            <h2>Login</h2>
            <form>
              <div className="inputBx">
                <input type="email" placeholder="email" required />
                <img src={userImg} alt="user"></img>
              </div>

              <div className="inputBx">
                <input type="password" placeholder="password" required />
                <img src={lock} alt="lock"></img>
              </div>

              <label className="remember">
                <input type="checkbox" />
                remember me
              </label>

              <div className="inputBx">
                <input className="rounded-md px-4 py-2  text-white-light transform-gpu transition-all  duration-150 hover:text-gray-800 hover:-translate-y-0.5 flex flex-nowrap w-fit space-x-2 items-center border border-opacity-60"
                type="submit" value="submit" placeholder="Login" />
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
}
export default Login;
