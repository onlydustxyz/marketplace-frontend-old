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
  it("should display the 3 projects", async () => {
    expect(screen.getByTestId("project-list").children.length).toBe(3);

    expect(screen.getByTestId("project-card-1-title").textContent).toBe("Project 1");
    expect(screen.getByTestId("project-card-1-description").textContent).toBe("Description 1");
    expect(screen.getByTestId("project-card-1-available-contributions").textContent).toBe("1 available contributions");
    expect(screen.queryByTestId("project-card-1-technologies")).toBeNull();

    expect(screen.getByTestId("project-card-2-title").textContent).toBe("Project 2");
    expect(screen.getByTestId("project-card-2-description").textContent).toBe("Description 2");
    expect(screen.getByTestId("project-card-2-available-contributions").textContent).toBe("0 available contributions");
    expect(screen.queryByTestId("project-card-2-technologies")).toBeNull();

    expect(screen.getByTestId("project-card-3-title").textContent).toBe("Project 3");
    expect(screen.getByTestId("project-card-3-description").textContent).toBe("Description 3");
    expect(screen.getByTestId("project-card-3-available-contributions").textContent).toBe("2 available contributions");
    expect(screen.getByTestId("project-card-3-technologies").textContent).toBe("rust, javascript");
  });
});
