import { RecoilRoot, useRecoilValue } from "recoil";
import { spy } from "sinon";
import { renderHook } from "@testing-library/react-hooks";
import { contributionsQuery } from "./state";
import { repository } from "./model/contributions/repository";
import { expect } from "chai";

describe("The recoil state", () => {
  describe("when querying contributions", () => {
    it("uses the repository", async () => {
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
});
