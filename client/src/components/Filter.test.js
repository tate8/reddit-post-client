
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom";
import React from "react";
import Filter from "./Filter";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useSearchParams: () => ([null, (newQuery, newFilter) => {}])
}));

describe("Filter", () => {
  test('filter by "top" button should have class "active" when filter is "top"', () => {
    const filter = "top";

    render(<Filter query={null} filter={filter} />);

    expect(screen.getByTestId("filter-by-top")).toHaveClass("active");
  });
});
