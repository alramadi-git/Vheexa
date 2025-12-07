import { tUuid } from "@/validations/uuid";
import { tMemberModel } from "@/models/partner/member";

import { tSuccessManyModel, tSuccessOneModel } from "@/models/success";
import { tFailedModel } from "@/models/failed";

import {
  tSuccessOneService,
  tSuccessManyService,
  tResponseOneService,
  tResponseManyService,
  ClsErrorService,
  ClsAbstractService,
} from "@/services/service";

class ClsVehicleModelService extends ClsAbstractService {
  public constructor() {
    super("/partner/vehicle-models");
  }

  private async _getOneAsync(
    uuid: tUuid,
  ): Promise<tSuccessOneService<tMemberModel>> {
    const response = await fetch(`${this._url}/${uuid}`, {
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
  public async getOneAsync(
    uuid: tUuid,
  ): Promise<tResponseOneService<tMemberModel>> {
    return this.catcher<tSuccessOneService<tMemberModel>>(
      async () => await this._getOneAsync(uuid),
    );
  }

  private async _getManyAsync(): Promise<tSuccessManyService<tMemberModel>> {
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

    const responseBody: tSuccessManyModel<tMemberModel> = await response.json();
    return {
      isSuccess: true,
      statusCode: response.status,
      statusText: response.statusText,
      data: responseBody.data,
      pagination: responseBody.pagination,
    };
  }
  public async getManyAsync(): Promise<tResponseManyService<tMemberModel>> {
    return this.catcher<tSuccessManyService<tMemberModel>>(
      async () => await this._getManyAsync(),
    );
  }
}

export { ClsVehicleModelService };
