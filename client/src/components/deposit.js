import React, { useEffect } from "react";
import { BankForm } from "./context";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./context";

const Deposit = ({ currentUser, refreshCurrentUser }) => {
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState("");

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

    fetch(`${apiUrl}/balance/${currentUser.uid}/${amount}`, {
      method: "Put",
    })
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        refreshCurrentUser(user.value, () => {
          setStatus("Deposit success!");
          setTimeout(() => setStatus(""), 3000);
        });
      });
  };

  return (
    <BankForm
      bgcolor="primary"
      header="Deposit"
      title={currentUser && `Balance: $${currentUser.balance}`}
      displayForm={currentUser !== null}
      inputFields={fields}
      handleSubmit={handleDeposit}
      submitButtonText={"Deposit"}
      status={status}
      successString="Please sign in to deposit"
    />
  );
};

export default Deposit;
