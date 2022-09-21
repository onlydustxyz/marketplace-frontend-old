import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { act, screen } from "@testing-library/react";

import { render } from "tests/utils";

import ContributionDetailsPage from "./index";

import { MutableSnapshot } from "recoil";
import { AccountInterface, Contract } from "starknet";
import { accountAtom, profileRegistryContractAtom } from "src/state";
import { BN } from "bn.js";

import * as reactRouterDomImport from "react-router-dom";

const { useParams } = reactRouterDomImport;

vi.mock("react-router-dom", async () => {
  const reactRouterDom = (await vi.importActual("react-router-dom")) as typeof reactRouterDomImport;

  return { ...reactRouterDom, useParams: vi.fn().mockReturnValue({ contributionId: "1" }) };
});

const contractMock = new Contract([], "0x00");

const contractCallMock = vi.fn(() =>
  Promise.resolve([
    {
      contributor_id: { low: "0x26", high: "0x0" }, // contributor_id = 38
      identifiers: {
        github: new BN(12),
      },
    },
  ])
);

contractMock.call = contractCallMock;

const initRecoilState = ({ set }: MutableSnapshot) => {
  set(accountAtom, { address: "0x123456789" } as AccountInterface);
  set(profileRegistryContractAtom, contractMock);
};

describe("Contribution details page", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  it("Should display an error when the contribution does not exist", async () => {
    (useParams as Mock).mockReturnValue({ contributionId: "does-not-exists" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    expect(screen.getAllByText("Oops, it seems this contribution doesn't exist"));
  });

  it("Should display correct information", async () => {
    (useParams as Mock).mockReturnValue({ contributionId: "1" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    expect(screen.getAllByText("Contribution 1"));
    expect(screen.getAllByText("Project 1"));
    expect(screen.getAllByText("Description 1"));
    expect(screen.getByText("easy"));
    expect(screen.getAllByText("feature"));
    expect(screen.getAllByText("isolated"));
    expect(screen.getAllByText("under a day"));

    const button = screen.getByRole("button");
    expect(button.textContent?.toLowerCase()).toBe("apply");
    expect(button.getAttribute("disabled")).toBeNull();
  });

  it("Should display claim button", async () => {
    (useParams as Mock).mockReturnValue({ contributionId: "3" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    const button = screen.getByRole("button");
    expect(button.textContent?.toLowerCase()).toBe("claim");
    expect(button.getAttribute("disabled")).toBeNull();
  });

  it("Should display claim button with old members format", async () => {
    const customInitRecoilState = ({ set }: MutableSnapshot) => {
      set(accountAtom, { address: "0x123456789abcdef" } as AccountInterface);
      set(profileRegistryContractAtom, contractMock);
    };

    (useParams as Mock).mockReturnValue({ contributionId: "3" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: customInitRecoilState });
    });

    const button = screen.getByRole("button");
    expect(button.textContent?.toLowerCase()).toBe("claim");
    expect(button.getAttribute("disabled")).toBeNull();
  });

  it("Should display disabled applied button", async () => {
    (useParams as Mock).mockReturnValue({ contributionId: "4" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    const button = screen.getByRole("button");
    expect(button.textContent?.toLowerCase()).toBe("applied");
    expect(button.getAttribute("disabled")).not.toBeNull();
  });

  it("Should display a disabled button due to gated contributions", async () => {
    (useParams as Mock).mockReturnValue({ contributionId: "5" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    const button = screen.getByRole("button");
    expect(button.textContent?.toLowerCase()).toBe("claim");
    expect(button.getAttribute("disabled")).not.toBeNull();
  });
});
