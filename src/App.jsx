import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Fpassword from "./Fpassword";
import { stringifyForDisplay } from "@apollo/client/utilities";
import ResetPassword from "./ResetPassword";
export const userContext = React.createContext();
function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedinUser = localStorage.getItem("user");
    console.log("logged in user", loggedinUser);
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          <Route path="/auth/forgetpassword" element={<Fpassword />}></Route>
          <Route
            path="/"
            element={user ? <Home handleLogout={handleLogout} /> : <Login />}
          />
          <Route
            path={`/auth/reset/:token`}
            element={<ResetPassword />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
