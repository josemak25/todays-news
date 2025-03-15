import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./input";

describe("Input Component", () => {
  test("renders input correctly", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  test("calls onChange function when text is entered", () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Enter text" onChange={handleChange} />);
    fireEvent.change(screen.getByPlaceholderText("Enter text"), {
      target: { value: "Hello" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
