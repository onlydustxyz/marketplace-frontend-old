import { beforeEach, describe, expect, it } from "vitest";
import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HeadlessWalletFactory, MockAccount, MockProvider } from "tests/lib/starknet-wallet-mock";

import { renderApp } from "tests/utils";
import { HeadlessWallet } from "tests/lib/starknet-wallet-mock/wallet";

const walletFactory = new HeadlessWalletFactory();

let headlessWallet: HeadlessWallet;

describe("Connect wallet", () => {
  beforeEach(async () => {
    await act(async () => {
      headlessWallet = walletFactory.create(window, {
        id: "headless-test",
        name: "Headless Test",
        windowPropertyName: "starknet_headless",
        accountFactory: (address: string) => {
          return new MockAccount(address);
        },
        provider: new MockProvider(),
      });

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

    await act(async () => {
      await user.click(screen.getByTestId("button-connect-headless-test"));
    });

    await act(() => {
      headlessWallet.connect({ address: "0x12340241B3e9559bF8786c236128525A2CC36a2c04F0115Ff902c63Df712cdef" });
    });

    within(walletConnectionStateElement).getByText("0x1234...cdef");
  });
});
