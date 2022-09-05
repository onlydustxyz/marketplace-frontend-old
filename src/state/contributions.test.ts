import { afterEach, describe, it, expect, vi } from "vitest";
import { RecoilRoot, snapshot_UNSTABLE, useRecoilValue } from "recoil";
import { renderHook } from "@testing-library/react-hooks";
import {
  ContributionApplication,
  contributionQuery,
  contributionsQuery,
  contributorApplicationsQuery,
} from "./contributions";
import { projectRepository } from "src/model/projects/repository";
import { profileRegistryContractAtom } from "./profile-registry-contract";
import { AccountInterface, Contract } from "starknet";
import { accountAtom } from "./starknet";
import { applicationRepository } from "src/model/applications/repository";

describe("The recoil state", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when querying contributions", () => {
    it("uses the repository list function", async () => {
      const listSpy = vi.spyOn(projectRepository, "list");

      const { result, waitForValueToChange } = renderHook(() => useRecoilValue(contributionsQuery), {
        wrapper: RecoilRoot,
      });

      expect(result.current).to.be.undefined;

      await waitForValueToChange(() => result.current);

      expect(listSpy).toHaveBeenCalled();
      expect(result.current).to.have.length(5);
    });
  });

  describe("when querying a single contribution", () => {
    it("uses the contributions cache", async () => {
      // TODO: make this test not depend on the previous one by clearing the recoil cache
      const listSpy = vi.spyOn(projectRepository, "list");

      const existingId = "1";
      const { result } = renderHook(() => useRecoilValue(contributionQuery(existingId)), {
        wrapper: RecoilRoot,
      });

      // One can argue that this test also checks the cache ¯\_(ツ)_/¯
      expect(listSpy).not.toHaveBeenCalled();
      expect(result.current?.id).to.equal(existingId);
    });
  });

  describe("when querying applications", () => {
    it("should return contributor applications", async () => {
      const contractMock = new Contract([], "0x00");

      const contractCallMock = vi.fn(() =>
        Promise.resolve([
          {
            contributor_id: { low: "0x26", high: "0x0" },
          },
        ])
      );

      contractMock.call = contractCallMock;

      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(profileRegistryContractAtom, contractMock);
        set(accountAtom, { address: "0x123456789" } as AccountInterface);
      });

      const listSpy = vi.spyOn(applicationRepository, "list");

      const result = snapshot.getLoadable(contributorApplicationsQuery);

      const res = (await result.contents) as Promise<ContributionApplication[]>;

      expect(contractCallMock).toHaveBeenCalledWith("get_user_information", ["0x123456789"]);
      expect(listSpy).toHaveBeenCalled();
      expect(res).to.have.length(2);
      snapshot.retain();
    });

    it("should return nothing when contributor has no application", async () => {
      const contractMock = new Contract([], "0x00");

      const contractCallMock = vi.fn(() =>
        Promise.resolve([
          {
            contributor_id: { low: "0x24", high: "0x0" },
          },
        ])
      );

      contractMock.call = contractCallMock;

      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(profileRegistryContractAtom, contractMock);
        set(accountAtom, { address: "0x123456789" } as AccountInterface);
      });

      const listSpy = vi.spyOn(applicationRepository, "list");

      const result = snapshot.getLoadable(contributorApplicationsQuery);

      const res = (await result.contents) as Promise<ContributionApplication[]>;

      expect(contractCallMock).toHaveBeenCalledWith("get_user_information", ["0x123456789"]);
      expect(listSpy).toHaveBeenCalled();
      expect(res).to.have.length(0);
      snapshot.retain();
    });

    it("should return nothing when no contributor", async () => {
      const contractMock = new Contract([], "0x00");

      const contractCallMock = vi.fn(() => Promise.reject(new Error("contract.call error")));
      console.warn = vi.fn();

      contractMock.call = contractCallMock;

      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(profileRegistryContractAtom, contractMock);
        set(accountAtom, { address: "0x123456789" } as AccountInterface);
      });

      const listSpy = vi.spyOn(applicationRepository, "list");

      const result = snapshot.getLoadable(contributorApplicationsQuery);

      const res = (await result.contents) as Promise<ContributionApplication[]>;

      expect(contractCallMock).toHaveBeenCalledWith("get_user_information", ["0x123456789"]);
      expect(listSpy).toHaveBeenCalledTimes(0);
      expect(res).to.have.length(0);
    });
  });
});
