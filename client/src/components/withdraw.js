import React from "react";
import { BankForm } from "./context";
import { UserContext } from "./context";

const Withdraw = () => {
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  const show = ctx.currentUser !== null;
  const [balance, setBalance] = React.useState(
    ctx.currentUser ? ctx.currentUser.balance : 0
  );

  const fields = [
    {
      id: "withdraw-input",
      type: "number",
      label: "Amount (USD)",
      handleOnChange: (e) => setAmount(e.currentTarget.value),
    },
  ];

  const validate = (amountInput) => {
    if (
      !amountInput ||
      isNaN(amountInput) ||
      amountInput < 0 ||
      amountInput > balance
    ) {
      setStatus("Invalid withdrawal amount");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const withdraw = () => {
    if (!validate(amount)) {
      return;
    }

    const numberAmount = Number(amount);
    const newBalance = balance - numberAmount;
    ctx.currentUser.balance = newBalance;

    setBalance(newBalance);
    setStatus("Withdrawal success!");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <BankForm
      bgcolor="primary"
      header="Withdraw"
      title={ctx.currentUser && `Balance: $${balance}`}
      displayForm={show}
      inputFields={fields}
      handleSubmit={withdraw}
      submitButtonText={"Withdraw"}
      status={status}
      successString="Please sign in to withdraw"
    />
  );
};

export default Withdraw;
