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
import { AccountInterface } from "starknet";
import { accountAtom } from "./starknet";
import { applicationRepository } from "src/model/applications/repository";
import { contributorRepository } from "src/model/contributors/repository";

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
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(accountAtom, { address: "0x123456789" } as AccountInterface);
      });

      const listSpy = vi.spyOn(applicationRepository, "list");
      const findByAccountAddressSpy = vi.spyOn(contributorRepository, "findByAccountAddress");

      const result = snapshot.getLoadable(contributorApplicationsQuery);

      const res = (await result.contents) as Promise<ContributionApplication[]>;

      expect(findByAccountAddressSpy).toHaveBeenCalledWith("0x123456789");
      expect(listSpy).toHaveBeenCalled();
      expect(res).to.have.length(2);
      snapshot.retain();
    });

    it("should return nothing when contributor has no application", async () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(accountAtom, { address: "0x123456789abcdef" } as AccountInterface);
      });

      const listSpy = vi.spyOn(applicationRepository, "list");

      const result = snapshot.getLoadable(contributorApplicationsQuery);

      const res = (await result.contents) as Promise<ContributionApplication[]>;

      expect(listSpy).toHaveBeenCalled();
      expect(res).to.have.length(0);
      snapshot.retain();
    });

    it("should return nothing when no contributor", async () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(accountAtom, { address: "0x1234567890" } as AccountInterface);
      });

      const listSpy = vi.spyOn(applicationRepository, "list");
      const findByAccountAddressSpy = vi.spyOn(contributorRepository, "findByAccountAddress");

      const result = snapshot.getLoadable(contributorApplicationsQuery);

      await expect(async () => (await result.contents) as ContributionApplication[]).rejects.toThrow(
        /^Failed to fetch contributor$/
      );

      expect(findByAccountAddressSpy).toHaveBeenCalledWith("0x1234567890");
      expect(listSpy).toHaveBeenCalledTimes(0);
    });
  });
});
