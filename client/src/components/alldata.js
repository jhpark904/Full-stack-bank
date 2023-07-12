import React from "react";
import { BankCard } from "./context";
import { apiUrl } from "./context";

function AllData() {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    fetch(`${apiUrl}/account/all`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <BankCard txtcolor="black" header="User Data" width={22} data={data} />
  );
}

export default AllData;
