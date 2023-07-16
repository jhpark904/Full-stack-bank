import React, { useEffect } from "react";
import { BankForm } from "./context";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./context";
import { auth } from "../auth/firebase";

const Withdraw = ({ currentUser, refreshCurrentUser }) => {
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
      amountInput > currentUser.balance
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

    if (auth.currentUser) {
      auth.currentUser.getIdToken().then((idToken) => {
        fetch(`${apiUrl}/balance/${currentUser._id}`, {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
          body: JSON.stringify({ amount: -amount }),
        })
          .then((res) => {
            return res.json();
          })
          .then((user) => {
            refreshCurrentUser(user._id, () => {
              setStatus("Withdrawal success!");
              setTimeout(() => setStatus(""), 3000);
            });
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
      header="Withdraw"
      title={currentUser && `Balance: $${currentUser.balance}`}
      displayForm={currentUser !== null}
      inputFields={fields}
      handleSubmit={withdraw}
      submitButtonText={"Withdraw"}
      status={status}
      successString="Please sign in to withdraw"
    />
  );
};

export default Withdraw;
