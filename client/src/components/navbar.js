import React, { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";

const tooltip = (displayInfo) => {
  return <Tooltip>{displayInfo}</Tooltip>;
};

const NavBar = () => {
  const [signedIn, setSignedIn] = useState(auth.currentUser != null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#/">
        Best Bank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <OverlayTrigger
            placement="bottom"
            overlay={tooltip("Navigate to create a new account")}
            triggers={["hover"]}
          >
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">
                Create Account
              </a>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={tooltip("Navigate to Log in with existing accout")}
            triggers={["hover"]}
          >
            <li className="nav-item">
              <a className="nav-link" href="#/login/">
                Login
              </a>
            </li>
          </OverlayTrigger>
          {signedIn && (
            <>
              <OverlayTrigger
                placement="bottom"
                overlay={tooltip("Navigate to deposit")}
                triggers={["hover"]}
              >
                <li className="nav-item">
                  <a className="nav-link" href="#/deposit/">
                    Deposit
                  </a>
                </li>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={tooltip("Navigate to withdraw")}
                triggers={["hover"]}
              >
                <li className="nav-item">
                  <a className="nav-link" href="#/withdraw/">
                    Withdraw
                  </a>
                </li>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={tooltip("Navigate to view customer data")}
                triggers={["hover"]}
              >
                <li className="nav-item">
                  <a className="nav-link" href="#/alldata/">
                    All Data
                  </a>
                </li>
              </OverlayTrigger>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
