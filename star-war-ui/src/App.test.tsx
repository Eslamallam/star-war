import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("should render component to screen", () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
});
