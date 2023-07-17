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
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchCurrentUser = (id, callback) => {
    if (auth.currentUser) {
      auth.currentUser.getIdToken().then((idToken) => {
        fetch(`${apiUrl}/account/get/${id}`, {
          method: "Get",
          headers: {
            Authorization: idToken,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data) {
              setCurrentUser(data.user);
              setIsAdmin(data.isAdmin);
              if (callback) {
                callback();
              }
            }
          });
      });
    } else {
      console.log("No signed in user");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
    });
  }, []);

  return (
    <HashRouter>
      <NavBar currentUser={currentUser} isAdmin={isAdmin} />
      <UserContext.Provider value={{ currentUser: null, users: {} }}>
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" exact element={<Home />} />

            <Route
              path="/CreateAccount/"
              element={<CreateAccount refreshCurrentUser={fetchCurrentUser} />}
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
