import { BankCard } from "./context";
import React from "react";

const Home = () => {
  return (
    <BankCard
      txtcolor="black"
      header="Best Bank Home"
      title="Welcome to the Best Bank!"
      text="You can navigate using the navigation bar."
      width={22}
      img="bank.png"
    />
  );
};

export default Home;
