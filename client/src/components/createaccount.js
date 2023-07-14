import React from "react";
import { apiUrl } from "./context";
import { BankForm } from "./context";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccount({ refreshCurrentUser }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const fields = [
    {
      id: "name-input",
      type: "name",
      label: "Name",
      handleOnChange: (e) => setName(e.currentTarget.value),
    },
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

  function validate(field, label) {
    if (!field) {
      setStatus(`Invalid value for ${label}`);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label === "password" && field.length < 8) {
      setStatus(`Password has to be at least 8 characters long`);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;

        const url = `${apiUrl}/account/create`;
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            uid: user.uid,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((user) => {
            refreshCurrentUser(user);
            setShow(false);
          });
      })
      .catch((error) => {
        setStatus(error.message);
        setTimeout(() => setStatus(""), 3000);
        return;
      });
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <BankForm
      bgcolor="primary"
      header="Create Account"
      status={status}
      inputFields={fields}
      handleSubmit={handleCreate}
      submitButtonText="Create Account"
      displayForm={show}
      successString="Success!"
      refreshActionString="Add another account"
      handleRefreshAction={clearForm}
    />
  );
}

export default CreateAccount;
