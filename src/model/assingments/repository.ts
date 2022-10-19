import { InMemoryAssignementRepository } from "./in-memory-repository";
import { FetchedAssignementRepository } from "./fetched-repository";
import { AssignementRepository } from "./types";

export const assignementRepository: AssignementRepository =
  process.env.NODE_ENV === "test" ? new InMemoryAssignementRepository() : new FetchedAssignementRepository();
