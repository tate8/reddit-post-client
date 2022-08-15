import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import SubredditBox from "./SubredditBox";

const UNIQUE_TITLE = "r/soccer";
const UNIQUE_DESCRIPTION = "This subreddit is about soccer";

// SubredditBox uses fetch to get basic info about a subreddit
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          over18: false,
          display_name_prefixed: UNIQUE_TITLE,
          public_description: UNIQUE_DESCRIPTION,
          icon_img: null,
        },
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("SubredditBox", () => {
  it('should have the correct title element text when the query is default: "popular"', () => {
    const defaultTitle = "r/popular";
    const query = "popular";
    render(<SubredditBox query={query} />);

    expect(screen.getByTestId("subreddit-title")).toHaveTextContent(
      defaultTitle
    );
  });

  it('should have the correct description element text when the query is default: "popular"', () => {
    const defaultDescription = "A collection of the most popular reddit posts";
    const query = "popular";
    render(<SubredditBox query={query} />);

    expect(screen.getByTestId("subreddit-description")).toHaveTextContent(
      defaultDescription
    );
  });

  it("should have the correct title element text when the query is unique", async () => {
    const query = "soccer";
    const component = render(<SubredditBox query={query} />);

    // wait for async useEffect to call fetch
    await act(async () => {
      await Promise.resolve(component);
    });

    expect(screen.getByTestId("subreddit-title")).toHaveTextContent(
      UNIQUE_TITLE
    );
  });

  it("should have the correct description element text when the query is unique", async () => {
    const query = "soccer";
    const component = render(<SubredditBox query={query} />);

    // wait for async useEffect to call fetch
    await act(async () => {
      await Promise.resolve(component);
    });

    expect(screen.getByTestId("subreddit-description")).toHaveTextContent(
      UNIQUE_DESCRIPTION
    );
  });
});
