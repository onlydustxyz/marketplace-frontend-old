import { beforeEach, describe, expect, it } from "vitest";
import { act, screen } from "@testing-library/react";

import { render } from "tests/utils";

import ProjectPage from "./index";

describe('"All projects" page', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<ProjectPage />);
    });
  });

  it("should not display a project with no contributions", () => {
    expect(screen.queryByText("Project 2")).toBeNull();
  });

  it("should display a project with no open contributions", () => {
    expect(screen.queryByText("Project 4")).toBeTruthy();
  });

  it("should not display a project with no active contributions", () => {
    expect(screen.queryByText("Project 5")).toBeNull();
  });

  it("should display the right data for the displayed projects", async () => {
    expect(screen.getByTestId("project-card-1-title").textContent).toBe("Project 1");
    expect(screen.getByTestId("project-card-1-description").textContent).toBe("Description 1");
    expect(screen.getByTestId("project-card-1-available-contributions").textContent).toBe("2 available contributions");
    expect(screen.getByTestId("project-card-1-technologies").textContent).toBe("python");

    expect(screen.getByTestId("project-card-3-title").textContent).toBe("Project 3");
    expect(screen.getByTestId("project-card-3-description").textContent).toBe("Description 3");
    expect(screen.getByTestId("project-card-3-available-contributions").textContent).toBe("3 available contributions");
    expect(screen.getByTestId("project-card-3-technologies").textContent).toBe("rust, javascript");

    expect(screen.getByTestId("project-card-4-title").textContent).toBe("Project 4");
    expect(screen.getByTestId("project-card-4-description").textContent).toBe("Description 4");
    expect(screen.getByTestId("project-card-4-available-contributions").textContent).toBe("0 available contributions");
    expect(screen.getByTestId("project-card-4-technologies").textContent).toBe("javascript, rust");
  });
});
