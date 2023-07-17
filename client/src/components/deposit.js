import React, { useEffect } from "react";
import { BankForm } from "./context";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./context";
import { auth } from "../auth/firebase";

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

    if (auth.currentUser) {
      auth.currentUser.getIdToken().then((idToken) => {
        fetch(`${apiUrl}/balance/${currentUser._id}`, {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
          body: JSON.stringify({ amount: amount }),
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
                setStatus("Deposit success!");
                setTimeout(() => setStatus(""), 3000);
              });
            }
          });
      });
    } else {
      setStatus("You are not signed in!");
      setTimeout(() => setStatus(""), 3000);
    }
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
