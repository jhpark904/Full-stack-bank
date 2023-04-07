import React from "react";
import { BankCard } from "./context";
import { UserContext } from "./context";

function AllData() {
  const ctx = React.useContext(UserContext);

  return (
    <BankCard txtcolor="black" header="User Data" width={22} data={ctx.users} />
  );
}

export default AllData;
