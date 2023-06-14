import { BankForm } from "./context";
import React from "react";
import { UserContext } from "./context";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(ctx.currentUser === null);

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

  const signOut = () => {
    setEmail("");
    setPassword("");
    setShow(true);
    ctx.currentUser = null;
  };

  const signIn = () => {
    if (!validate(email, "Email address")) {
      return;
    }

    if (!validate(password, "password")) {
      return;
    }

    const users = ctx.users;
    if (
      Object.hasOwn(users, email) &&
      users[`${email}`].password === password
    ) {
      ctx.currentUser = users[`${email}`];
      setShow(false);
    }
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
      successString={ctx.currentUser && `Welcome ${ctx.currentUser.name}!`}
      refreshActionString="Sign out"
      handleRefreshAction={signOut}
    />
  );
};

export default Login;
