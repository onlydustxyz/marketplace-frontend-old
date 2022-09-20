import { vi } from "vitest";

// eslint-disable-next-line @typescript-eslint/no-empty-function
Element.prototype.scrollTo = () => {};

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
  takeRecords: () => null,
});
window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);
