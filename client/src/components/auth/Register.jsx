import {Link, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
const Register = props => {
  let navigate = useNavigate();
  const [userData, setuserData] = useState({
    username: "",
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
        alert("Email or username already exists");
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
  // * Redirect to dashboard if user is logged in
  // useEffect(() => {
  //   props.sessionsID && navigate("/dashboard");
  // }, [props, props.sessionsID]);
  return (
    <div className="register">
      <div className="left-side">
        <h2>Welcome!</h2>
        <p>
          Already have an account?
          <br />
          Please login with your personal info
        </p>
        <Link to={"/login"}>Login</Link>
      </div>
      <div className="right-side">
        <h1>Create Account</h1>
        <div className="third-party-auth">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-google-plus-g"></i>
          <i className="fa-brands fa-github"></i>
        </div>
        <p>or use your email for registration:</p>
        <form onSubmit={submitData}>
          <label>
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              placeholder="Name"
              name="username"
              required
              onChange={collectData}
            />
          </label>
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
          <button>sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
