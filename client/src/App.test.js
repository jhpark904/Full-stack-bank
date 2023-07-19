import { render, screen } from "@testing-library/react";
import App from "./App";
import CreateAccount from "./components/createaccount";
import userEvent from "@testing-library/user-event";
import React from "react";
import { HashRouter } from "../src/components/context";

test("renders app", () => {
  render(<App />);

  screen.getByText("Best Bank Home");
  screen.getByText("Welcome to the Best Bank!");
  screen.getByText("You can navigate using the navigation bar.");
});

test("renders create account", async () => {
  const user = userEvent.setup();
  render(
    <HashRouter>
      <CreateAccount />
    </HashRouter>
  );

  screen.getByText("Name");
  screen.getByText("Email address");
  screen.getByText("Password");
  screen.getAllByText("Create Account");

  // await user.type(screen.getByText("Name"), "Jacob");
  // await user.type(screen.getByText("Email address"), "hello@gmail.com");
  // await user.type(screen.getByText("Password"), "1234");
  // await user.click(screen.getAllByText("Create Account")[1]);

  // screen.getByText("Success!");
});
