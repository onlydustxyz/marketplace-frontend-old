import { afterEach, describe, it, expect, vi } from "vitest";
import { RecoilRoot, useRecoilValue } from "recoil";
import { renderHook } from "@testing-library/react-hooks";
import { contributionQuery, contributionsQuery } from "./repository";
import { repository } from "src/model/contributions/repository";

describe("The recoil state", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("when querying contributions", () => {
    it("uses the repository list function", async () => {
      const listSpy = vi.spyOn(repository, "list");

      const { result, waitForValueToChange } = renderHook(() => useRecoilValue(contributionsQuery), {
        wrapper: RecoilRoot,
      });

      expect(result.current).to.be.undefined;

      await waitForValueToChange(() => result.current);

      expect(listSpy).toHaveBeenCalled();
      expect(result.current).to.have.length(1);
    });
  });

  describe("when querying a single contribution", () => {
    it("uses the contributions cache", async () => {
      // TODO: make this test not depend on the previous one by clearing the recoil cache
      const listSpy = vi.spyOn(repository, "list");

      const existingId = "1";
      const { result } = renderHook(() => useRecoilValue(contributionQuery(existingId)), {
        wrapper: RecoilRoot,
      });

      // One can argue that this test also checks the cache ¯\_(ツ)_/¯
      expect(listSpy).not.toHaveBeenCalled();
      expect(result.current?.id).to.equal(existingId);
    });
  });
});
