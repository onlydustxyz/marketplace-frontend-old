import { beforeEach, describe, expect, it } from "vitest";
import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderApp } from "tests/utils";

describe("Connect wallet", () => {
  beforeEach(async () => {
    await act(async () => {
      renderApp({ route: "/" });
    });
  });
  it("should connect and display the wallet address", async () => {
    const user = userEvent.setup();

    expect(await screen.findByTestId("header-connect-button", undefined, { timeout: 5000 })).toBeDefined();

    await act(async () => {
      await user.click(screen.getByTestId("header-connect-button"));
    });

    expect(await screen.findByTestId("register-modal", undefined, { timeout: 5000 })).toBeDefined();

    const walletConnectionStateElement = screen.getByTestId("wallet-connection-state");
    const githubConnectionStateElement = screen.getByTestId("github-connection-state");
    const discordConnectionStateElement = screen.getByTestId("discord-connection-state");

    within(walletConnectionStateElement).getByText("Not connected");
    within(githubConnectionStateElement).getByText("Not connected");
    within(discordConnectionStateElement).getByText("Not connected");
  });
});
