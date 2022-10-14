import { afterEach, describe, it, expect, vi } from "vitest";
import { RecoilRoot, useRecoilValue } from "recoil";
import { renderHook } from "@testing-library/react-hooks";
import { contributionQuery } from "./contribution";

describe("The recoil state", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when querying a single contribution", () => {
    it("retrieve contribution", async () => {
      const existingId = "1";
      const { result, waitForValueToChange } = renderHook(() => useRecoilValue(contributionQuery(existingId)), {
        wrapper: RecoilRoot,
      });

      await waitForValueToChange(() => result.current);

      expect(result.current?.id).to.equal(existingId);
    });
  });
});
