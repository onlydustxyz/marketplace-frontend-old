import axios from "axios";
import config from "src/config";

import { AssignementRepository, AssignementDto, ListParams } from "./types";

export class FetchedAssignementRepository implements AssignementRepository {
  public async list({ contributorAccountAddress }: ListParams = {}): Promise<AssignementDto[]> {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/applications`);

    if (contributorAccountAddress !== undefined) {
      endpointUrl.searchParams.set("contributor_account_address", contributorAccountAddress);
    }

    const response = await axios.get<AssignementDto[]>(endpointUrl.toString());

    return response.status === 200 ? response.data : [];
  }
}
