import { BankForm } from "./context";
import React from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

const Login = ({ currentUser }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");

  const show = currentUser == null;

  const fields = [
    {
      id: "email-input",
      divClass: "form-group",
      inputClass: "form-control",
      type: "email",
      label: "Email address",
      handleOnChange: (e) => setEmail(e.currentTarget.value),
    },
    {
      id: "pw-input",
      divClass: "form-group",
      inputClass: "form-control",
      type: "password",
      label: "Password",
      handleOnChange: (e) => setPassword(e.currentTarget.value),
    },
  ];

  const validate = (field, label) => {
    if (!field) {
      setStatus(`Invalid value for ${label}`);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successfuly
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(`${error.message}`);
      });
  };

  const signIn = () => {
    if (!validate(email, "Email address")) {
      return;
    }

    if (!validate(password, "password")) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setStatus(error.message);
      setTimeout(() => setStatus(""), 3000);
    });
  };

  return (
    <BankForm
      bgcolor="primary"
      header="Log In"
      displayForm={show}
      inputFields={fields}
      handleSubmit={signIn}
      submitButtonText={"Log in"}
      status={status}
      successString={currentUser && `Welcome ${currentUser.name}!`}
      refreshActionString="Sign out"
      handleRefreshAction={logOut}
    />
  );
};

export default Login;
