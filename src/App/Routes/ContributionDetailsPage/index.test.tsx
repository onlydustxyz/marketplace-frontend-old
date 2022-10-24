import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "tests/utils";

import ContributionDetailsPage from "./index";

import { MutableSnapshot } from "recoil";
import { AccountInterface } from "starknet";
import { accountAtom } from "src/state";
import { applicationRepository } from "src/model/applications/repository";

import * as reactRouterDomImport from "react-router-dom";

const { useParams } = reactRouterDomImport;

vi.mock("react-router-dom", async () => {
  const reactRouterDom = (await vi.importActual("react-router-dom")) as typeof reactRouterDomImport;

  return { ...reactRouterDom, useParams: vi.fn().mockReturnValue({ contributionId: "1" }) };
});

const initRecoilState = ({ set }: MutableSnapshot) => {
  set(accountAtom, { address: "0x123456789" } as AccountInterface);
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

  it("Should display applied button", async () => {
    (useParams as Mock).mockReturnValue({ contributionId: "4" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    const button = screen.getByRole("button");
    expect(button.textContent?.toLowerCase()).toBe("applied");
    expect(button.getAttribute("disabled")).not.toBeNull();
  });

  it("Should display submit button", async () => {
    (useParams as Mock).mockReturnValue({ contributionId: "6" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    const button = screen.getByRole("button");
    expect(button.textContent?.toLowerCase()).toBe("submit work");
    expect(button.getAttribute("disabled")).toBeNull();
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

  it("Should display register modal when applying with connection", async () => {
    const user = userEvent.setup();

    const createSpy = vi.spyOn(applicationRepository, "create");

    (useParams as Mock).mockReturnValue({ contributionId: "1" });

    await act(async () => {
      render(<ContributionDetailsPage />, {});
    });

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(createSpy).not.toHaveBeenCalled();

    expect(await screen.findByTestId("register-modal", undefined, { timeout: 5000 })).toBeDefined();
  });

  it("Should display register modal when applying with no discord account", async () => {
    const initRecoilState = ({ set }: MutableSnapshot) => {
      set(accountAtom, { address: "0x123456789abcdef" } as AccountInterface);
    };
    const user = userEvent.setup();

    const createSpy = vi.spyOn(applicationRepository, "create");

    (useParams as Mock).mockReturnValue({ contributionId: "1" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(createSpy).not.toHaveBeenCalled();

    expect(await screen.findByTestId("register-modal", undefined, { timeout: 5000 })).toBeDefined();
  });

  it("Should display register modal when claiming with no discord account", async () => {
    const initRecoilState = ({ set }: MutableSnapshot) => {
      set(accountAtom, { address: "0x0abcdefabcdef" } as AccountInterface);
    };
    const user = userEvent.setup();

    const createSpy = vi.spyOn(applicationRepository, "create");

    (useParams as Mock).mockReturnValue({ contributionId: "1" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(createSpy).not.toHaveBeenCalled();

    expect(await screen.findByTestId("register-modal", undefined, { timeout: 5000 })).toBeDefined();
  });

  it("Should apply to a contribution when clicking on the 'Apply' button", async () => {
    const user = userEvent.setup();

    const createSpy = vi.spyOn(applicationRepository, "create");

    (useParams as Mock).mockReturnValue({ contributionId: "1" });

    await act(async () => {
      render(<ContributionDetailsPage />, {}, { initializeRecoilState: initRecoilState });
    });

    await user.click(screen.getByRole("button"));

    expect(createSpy).toHaveBeenCalledWith({
      contributionId: "1",
      contributorAccountAddress: "0x0000000000000000000000000000000000000000000000000000000123456789",
    });
  });
});
