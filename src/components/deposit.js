import React from "react";
import { UserContext } from "./context";
import { BankForm } from "./context";

const Deposit = () => {
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  const show = ctx.currentUser !== null;
  const [balance, setBalance] = React.useState(
    ctx.currentUser ? ctx.currentUser.balance : 0
  );

  const fields = [
    {
      id: "deposit-input",
      type: "number",
      label: "Amount (USD)",
      handleOnChange: (e) => setAmount(e.currentTarget.value),
    },
  ];

  const validate = (amountInput) => {
    if (!amountInput || isNaN(amountInput) || amountInput < 0) {
      setStatus("Invalid deposit amount");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const deposit = () => {
    if (!validate(amount)) {
      return;
    }

    const numberAmount = Number(amount);
    const newBalance = balance + numberAmount;
    ctx.currentUser.balance = newBalance;

    setBalance(newBalance);
    setStatus("Deposit success!");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <BankForm
      bgcolor="primary"
      header="Deposit"
      title={ctx.currentUser && `Balance: $${balance}`}
      displayForm={show}
      inputFields={fields}
      handleSubmit={deposit}
      submitButtonText={"Deposit"}
      status={status}
      successString="Please sign in to deposit"
    />
  );
};

export default Deposit;
