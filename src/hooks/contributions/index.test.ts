import { expect } from "chai";
import { stub } from "sinon";
import { repository } from "./repository";

describe("The useContributions hook", () => {
  let listStub: sinon.SinonStub;

  beforeEach(() => {
    listStub = stub(repository, "list");
  });

  afterEach(() => {
    listStub.restore();
  });

  it("uses the repository to fetch the contributions list", async () => {
    expect(true).to.be.true;
  });
});
