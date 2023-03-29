import {Routes, Route} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import React, {useState} from "react";

function App() {
  const [sessionsID, setsessionsID] = useState();
  return (
    <div className="App">
      <Routes>
        <Route
          path={"/register"}
          element={<Register setsessionsID={setsessionsID} />}
        />
        <Route
          path={"/login"}
          element={<Login setsessionsID={setsessionsID} />}
        />
        <Route path={"/dashboard"} element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
