import {Link, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
const Login = props => {
  let navigate = useNavigate();
  // * Redirect to dashboard if user is logged in
  const [userData, setuserData] = useState({
    password: "",
    email: "",
  });
  function collectData(e) {
    setuserData(prevval => {
      return {...prevval, [e.target.name]: e.target.value};
    });
  }
  async function submitData(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:6001/auth/register", userData, {
        withCredentials: true, // send and receive cookies
      })
      .then(res => {
        res.data.message == "User created" && navigate("/dashboard");
      })
      .catch(err => {
        alert("Wrong credentials");
      });
  }
  // * sessions
  useEffect(() => {
    axios
      .get("http://localhost:6001/auth/login", {withCredentials: true})
      .then(res => {
        console.log(res.data.message);
        res.data.message === "User is logged in"
          ? props.setsessionsID(true)
          : props.setsessionsID(false);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  }, []);
  return (
    <div className="login">
      <div className="right-side">
        <h1>Login</h1>
        <div className="third-party-auth">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-google-plus-g"></i>
          <i className="fa-brands fa-github"></i>
        </div>
        <p>or use your email for login:</p>
        <form onSubmit={submitData}>
          <label>
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={collectData}
            />
          </label>
          <label>
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={collectData}
            />
          </label>
          <button>Login</button>
        </form>
      </div>{" "}
      <div className="left-side">
        <h2>Welcome!</h2>
        <p>
          Dont have an account?
          <br />
          Register now
        </p>
        <Link to={"/register"}>Create Account</Link>
      </div>
    </div>
  );
};

export default Login;
