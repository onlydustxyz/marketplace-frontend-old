import { atom } from "recoil";

export const displayRegisterModalAtom = atom<boolean>({
  key: "displayRegisterModal",
  default: false,
});
