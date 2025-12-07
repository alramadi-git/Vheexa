import { tUuid, zUuid } from "@/validations/uuid";

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
import { tVehicleModelModel } from "@/models/partner/vehicle-model";

class ClsVehicleModelService extends ClsAbstractService {
  public constructor() {
    super("/partner/vehicle-models");
  }

  private async _getOneAsync(
    uuid: tUuid,
  ): Promise<tSuccessOneService<tVehicleModelModel>> {
    const parsedUuid = zUuid.parse(uuid);

    const data = await fetch(`${this._url}/${parsedUuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!data.ok) {
      const dataBody: tFailedModel = await data.json();
      throw new ClsErrorService(
        data.status,
        data.statusText,
        dataBody.message,
        dataBody.issues,
      );
    }

    const dataBody: tSuccessOneModel<tVehicleModelModel> = await data.json();
    return {
      isSuccess: true,
      statusCode: data.status,
      statusText: data.statusText,
      data: dataBody.data,
    };
  }
  public async getOneAsync(
    uuid: tUuid,
  ): Promise<tResponseOneService<tVehicleModelModel>> {
    return this.catcher<tSuccessOneService<tVehicleModelModel>>(
      async () => await this._getOneAsync(uuid),
    );
  }

  private async _getManyAsync(): Promise<
    tSuccessManyService<tVehicleModelModel>
  > {
    const data = await fetch(`${this._url}?`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!data.ok) {
      const dataBody: tFailedModel = await data.json();
      throw new ClsErrorService(
        data.status,
        data.statusText,
        dataBody.message,
        dataBody.issues,
      );
    }

    const dataBody: tSuccessManyModel<tVehicleModelModel> = await data.json();
    return {
      isSuccess: true,
      statusCode: data.status,
      statusText: data.statusText,
      data: dataBody.data,
      pagination: dataBody.pagination,
    };
  }
  public async getManyAsync(): Promise<
    tResponseManyService<tVehicleModelModel>
  > {
    return this.catcher<tSuccessManyService<tVehicleModelModel>>(
      async () => await this._getManyAsync(),
    );
  }
}

export { ClsVehicleModelService };
