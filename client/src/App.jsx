import {Routes, Route} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import React, {useState, useEffect} from "react";
import axios from "axios";
function App() {
  const [sessionsID, setsessionsID] = useState();
  console.log(sessionsID, "sessionsID");
  // * sessions
  useEffect(() => {
    axios
      .get("http://localhost:6001/auth/login", {withCredentials: true})
      .then(res => {
        console.log(res.data.message);
        res.data.message === "User is logged in"
          ? setsessionsID(true)
          : setsessionsID(false);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  }, []);
  console.log(sessionsID);
  return (
    <div className="App">
      <Routes>
        {sessionsID ? (
          <Route path={"/"} element={<Dashboard />} />
        ) : (
          <Route path={"/"} element={<Login />} />
        )}

        {!sessionsID && (
          <Route
            path={"/register"}
            element={
              <Register setsessionsID={setsessionsID} sessionsID={sessionsID} />
            }
          />
        )}
        {!sessionsID && (
          <Route
            path={"/login"}
            element={
              <Login setsessionsID={setsessionsID} sessionsID={sessionsID} />
            }
          />
        )}
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route
          path="*"
          element={<p>There's nothing here: 404! redirecting to dashboard</p>}
        />
      </Routes>
    </div>
    // index route is dashboard if sesssion exists . else its register or login
  );
}

export default App;
