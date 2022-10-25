import { afterEach, describe, it, expect, vi } from "vitest";
import { RecoilRoot, snapshot_UNSTABLE, useRecoilValue } from "recoil";
import { renderHook } from "@testing-library/react-hooks";
import { projectRepository } from "src/model/projects/repository";
import { AccountInterface } from "starknet";
import { accountAtom } from "./starknet";
import { applicationRepository } from "src/model/applications/repository";
import { ContributionApplication, rawContributorApplicationsQuery } from "./source/applications";
import { contributionsWithStatusState } from "./contributions";

describe("The recoil state", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when querying contributions", () => {
    it("uses the repository list function", async () => {
      const listSpy = vi.spyOn(projectRepository, "list");

      const { result, waitForValueToChange } = renderHook(() => useRecoilValue(contributionsWithStatusState), {
        wrapper: RecoilRoot,
      });

      expect(result.current).to.be.undefined;

      await waitForValueToChange(() => result.current);

      expect(listSpy).toHaveBeenCalled();
      expect(result.current).to.have.length(15);
    });
  });

  describe("when querying applications", () => {
    it("should return contributor applications", async () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(accountAtom, { address: "0x123456789" } as AccountInterface);
      });

      const listSpy = vi.spyOn(applicationRepository, "list");

      const result = snapshot.getLoadable(rawContributorApplicationsQuery);

      const res = (await result.contents) as Promise<ContributionApplication[]>;

      expect(listSpy).toHaveBeenCalledWith({
        contributorAccountAddress: "0x0000000000000000000000000000000000000000000000000000000123456789",
      });
      expect(res).to.have.length(2);
      snapshot.retain();
    });

    it("should return nothing when contributor has no application", async () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(accountAtom, { address: "0x123456789abcdef" } as AccountInterface);
      });

      const listSpy = vi.spyOn(applicationRepository, "list");

      const result = snapshot.getLoadable(rawContributorApplicationsQuery);

      const res = (await result.contents) as ContributionApplication[];

      expect(listSpy).toHaveBeenCalled();
      expect(res).to.have.length(0);
      snapshot.retain();
    });
  });
});
