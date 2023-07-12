import "./App.css";
import NavBar from "./components/navbar";
import { UserContext, HashRouter } from "./components/context";
import { Route, Routes } from "./components/context";
import Home from "./components/home";
import CreateAccount from "./components/createaccount";
import Login from "./components/login";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import AllData from "./components/alldata";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase";
import { apiUrl } from "./components/context";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = (user, callback) => {
    fetch(`${apiUrl}/account/get/${user.uid}`)
      .then((res) => {
        return res.json();
      })
      .then((userArray) => {
        if (userArray != null) {
          setCurrentUser(userArray[0]);

          if (callback) {
            callback();
          }
        }
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <HashRouter>
      <NavBar currentUser={currentUser} />
      <UserContext.Provider value={{ currentUser: null, users: {} }}>
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" exact element={<Home />} />

            <Route
              path="/CreateAccount/"
              element={<CreateAccount currentUser={currentUser} />}
            />
            <Route
              path="/login/"
              element={<Login currentUser={currentUser} />}
            />

            <Route
              path="/deposit/"
              element={
                <Deposit
                  currentUser={currentUser}
                  refreshCurrentUser={fetchCurrentUser}
                />
              }
            />

            {currentUser && (
              <Route
                path="/withdraw/"
                element={
                  <Withdraw
                    currentUser={currentUser}
                    refreshCurrentUser={fetchCurrentUser}
                  />
                }
              />
            )}
            {currentUser && <Route path="/alldata/" element={<AllData />} />}
          </Routes>
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
