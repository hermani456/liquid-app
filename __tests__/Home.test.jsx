import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import '@testing-library/jest-dom/';

it("should have asdf text", () => {
  render(<Home />);
  const element = screen.getByText("asdf");
  expect(element).toBeInTheDocument();
});
