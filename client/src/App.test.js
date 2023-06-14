import { render, screen } from "@testing-library/react";
import App from "./App";
import CreateAccount from "./components/createaccount";
import userEvent from "@testing-library/user-event";
import { UserContext } from "./components/context";

test("renders app", () => {
  render(<App />);

  screen.getByText("Bad Bank Home");
  screen.getByText("Welcome to the Bad Bank!");
  screen.getByText("You can navigate using the navigation bar.");
});

test("create account", async () => {
  const user = userEvent.setup();
  render(
    <UserContext.Provider value={{ currentUser: null, users: {} }}>
      <CreateAccount />
    </UserContext.Provider>
  );

  await user.type(screen.getByText("Name"), "Jacob");
  await user.type(screen.getByText("Email address"), "hello@gmail.com");
  await user.type(screen.getByText("Password"), "1234");
  await user.click(screen.getAllByText("Create Account")[1]);

  screen.getByText("Success!");
});
