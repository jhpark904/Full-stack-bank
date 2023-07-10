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

  const fetchCurrentUser = (user) => {
    fetch(`${apiUrl}/account/get/${user.uid}`)
      .then((res) => {
        return res.json();
      })
      .then((userArray) => {
        console.log(userArray);
        if (userArray != null) {
          setCurrentUser(userArray[0]);
        }
      });
  };

  const refreshCurrentUser = (user) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user signed in");
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
                  refreshCurrentUser={refreshCurrentUser}
                />
              }
            />

            {currentUser && <Route path="/withdraw/" element={<Withdraw />} />}
            {currentUser && <Route path="/alldata/" element={<AllData />} />}
          </Routes>
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
