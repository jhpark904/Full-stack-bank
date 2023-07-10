import React, { useEffect } from "react";
import { BankForm } from "./context";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./context";

const Deposit = ({ currentUser, refreshCurrentUser }) => {
  console.log(currentUser);
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const show = currentUser !== null;
  const [balance, setBalance] = React.useState(
    currentUser ? currentUser.balance : 0
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser == null) {
      navigate("/login/");
    }
  }, []);

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

  const handleDeposit = () => {
    if (!validate(amount)) {
      return;
    }

    const numberAmount = Number(amount);
    const newBalance = balance + numberAmount;
    currentUser.balance = newBalance;

    setBalance(newBalance);
    setStatus("Deposit success!");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <BankForm
      bgcolor="primary"
      header="Deposit"
      title={currentUser && `Balance: $${balance}`}
      displayForm={show}
      inputFields={fields}
      handleSubmit={handleDeposit}
      submitButtonText={"Deposit"}
      status={status}
      successString="Please sign in to deposit"
    />
  );
};

export default Deposit;
