import { expect } from "chai";
import { renderHook } from "@testing-library/react-hooks";
import { useContributions } from ".";

describe("The useContributions hook", () => {
  it("uses the repository to fetch the contributions list", async () => {
    const { result, waitForValueToChange } = renderHook(() => useContributions());

    expect(result.current.loading).to.be.true;
    expect(result.current.contributions).to.be.empty;

    await waitForValueToChange(() => result.current.loading);

    expect(result.current.loading).to.be.false;
    expect(result.current.contributions).not.to.be.empty;
  });
});
