import { BankCard } from "./context";
import React from "react";

const Home = () => {
  return (
    <BankCard
      txtcolor="black"
      header="Bad Bank Home"
      title="Welcome to the Bad Bank!"
      text="You can navigate using the navigation bar."
      width={22}
      img="bank.png"
    />
  );
};

export default Home;
