import React from "react";
import { BankCard } from "./context";
import { UserContext, apiUrl } from "./context";

function AllData() {
  const ctx = React.useContext(UserContext);
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    fetch(`${apiUrl}/account/all`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(JSON.stringify(data));
      });
  }, []);

  // return (
  //   <BankCard txtcolor="black" header="User Data" width={22} data={ctx.users} />
  // );
  return (
    <>
      <h5>All Data</h5>
      {data}
    </>
  );
}

export default AllData;
