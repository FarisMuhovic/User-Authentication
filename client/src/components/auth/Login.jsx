import {Link} from "react-router-dom";
const Login = () => {
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
        <form>
          <label>
            <i className="fa-solid fa-envelope"></i>
            <input type="email" placeholder="Email" name="email" required />
          </label>
          <label>
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
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
