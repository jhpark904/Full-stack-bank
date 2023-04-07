import React from "react";
import { UserContext } from "./context";
import { BankForm } from "./context";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

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
    if (label === "email" && Object.hasOwn(ctx.users, email)) {
      setStatus(`Duplicate mail already exists`);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    ctx.users[email] = { name, email, password, balance: 0 };
    setShow(false);
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
