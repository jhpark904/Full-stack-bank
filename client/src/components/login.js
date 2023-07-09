import { BankForm, apiUrl } from "./context";
import React from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [show, setShow] = React.useState(!auth.currentUser);

  const fields = [
    {
      id: "email-input",
      type: "email",
      label: "Email address",
      handleOnChange: (e) => setEmail(e.currentTarget.value),
    },
    {
      id: "pw-input",
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
        setShow(true);
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

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const url = `${apiUrl}/account/get/sample`;
        console.log(url);
        (async () => {
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
        })();

        setShow(false);
      })
      .catch((error) => {
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
      successString={!show && `Welcome to the Bank!`}
      refreshActionString="Sign out"
      handleRefreshAction={logOut}
    />
  );
};

export default Login;
