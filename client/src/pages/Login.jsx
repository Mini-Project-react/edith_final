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
                <input type="submit" value="submit" placeholder="Login" />
              </div>
            </form>
            <p>
              forget <a href="/">password?</a>
            </p>
            <Link to="/register-page">create new account!</Link>
          </div>
        </div>
      </section>
    );
  }
}
export default Login;
