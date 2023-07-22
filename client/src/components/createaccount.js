import React from "react";
import { apiUrl } from "./context";
import { BankForm } from "./context";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function CreateAccount({ refreshCurrentUser }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [makeAdmin, setMakeAdmin] = React.useState(false);

  const navigate = useNavigate();

  const fields = [
    {
      id: "name-input",
      divClass: "form-group",
      inputClass: "form-control",
      type: "name",
      label: "Name",
      handleOnChange: (e) => setName(e.currentTarget.value),
    },
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
    {
      id: "make-admin-checkbox",
      divClass: "form-check",
      inputClass: "form-check-input",
      type: "checkbox",
      label: "Create Admin Account",
      handleOnChange: (e) => setMakeAdmin(e.currentTarget.checked),
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

  function handleCreate(e) {
    e.preventDefault();

    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        const url = `${apiUrl}/account/create`;

        const userBody = {
          name: name,
          email: email,
          password: password,
          _id: user.uid,
          isAdmin: makeAdmin,
        };

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userBody),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.error) {
              setStatus(data.error);
              setTimeout(() => setStatus(""), 3000);
            } else {
              refreshCurrentUser(data._id, () => {
                navigate("/login/");
                setShow(false);
              });
            }
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
