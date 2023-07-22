import React from "react";
import { BankCard } from "./context";
import { apiUrl } from "./context";
import { auth } from "../auth/firebase";

function AllData({ currentUser }) {
  const [data, setData] = React.useState("");
  React.useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser.getIdToken().then((idToken) => {
        fetch(`${apiUrl}/account/all/${currentUser._id}`, {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setData(data);
          });
      });
    }
  }, []);

  return (
    <BankCard txtcolor="black" header="User Data" width={22} data={data} />
  );
}

export default AllData;
