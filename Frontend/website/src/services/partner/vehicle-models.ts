import { tMemberModel } from "@/models/partner/member";

import { tSuccessOneModel } from "@/models/general/success";
import { tFailedModel } from "@/models/general/failed";
import {
  tSuccessOneService,
  tResponseOneService,
  ClsErrorService,
  ClsAbstractService,
} from "@/services/service";

class ClsVehicleModelService extends ClsAbstractService {
  public constructor() {
    super("/partner/vehicle-models");
  }

  private async _getManyAsync(): Promise<tSuccessOneService<tMemberModel>> {
    const response = await fetch(`${this._url}?`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok === false) {
      const responseBody: tFailedModel = await response.json();
      throw new ClsErrorService(
        response.status,
        response.statusText,
        responseBody.message,
        responseBody.issues,
      );
    }

    const responseBody: tSuccessOneModel<tMemberModel> = await response.json();
    return {
      isSuccess: true,
      statusCode: response.status,
      statusText: response.statusText,
      data: responseBody.data,
    };
  }

  public async login(): Promise<tResponseOneService<tMemberModel>> {
    return this.catcher<tSuccessOneService<tMemberModel>>(
      async () => await this._getManyAsync(),
    );
  }
}

export { ClsVehicleModelService };
