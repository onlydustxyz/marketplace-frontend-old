import { RecoilRoot, useRecoilValue } from "recoil";
import { spy, restore } from "sinon";
import { renderHook } from "@testing-library/react-hooks";
import { contributionQuery, contributionsQuery } from "./repository";
import { repository } from "src/model/contributions/repository";
import { expect } from "chai";

describe("The recoil state", () => {
  afterEach(() => {
    restore();
  });

  describe("when querying contributions", () => {
    it("uses the repository list function", async () => {
      const listSpy = spy(repository, "list");

      const { result, waitForValueToChange } = renderHook(() => useRecoilValue(contributionsQuery), {
        wrapper: RecoilRoot,
      });

      expect(result.current).to.be.undefined;
      expect(listSpy).to.have.been.called;

      await waitForValueToChange(() => result.current);

      expect(result.current).to.have.length(1);
    });
  });

  describe("when querying a single contribution", () => {
    it("uses the contributions cache", async () => {
      // TODO: make this test not depend on the previous one by clearing the recoil cache
      const listSpy = spy(repository, "list");

      const existingId = "1";
      const { result } = renderHook(() => useRecoilValue(contributionQuery(existingId)), {
        wrapper: RecoilRoot,
      });

      // One can argue that this test also checks the cache ¯\_(ツ)_/¯
      expect(listSpy).not.to.have.been.called;
      expect(result.current?.id).to.equal(existingId);
    });
  });
});
