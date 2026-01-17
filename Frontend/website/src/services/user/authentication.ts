import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/credentials";

import { tUserModel } from "@/models/user/user";

import { tSuccessOneModel } from "@/models/success";
import { tFailedModel } from "@/models/error";

import {
  tSuccessOneService,
  tResponseOneService,
  ClsErrorService,
  ClsAbstractService,
} from "@/services/service";

class ClsAuthenticationService extends ClsAbstractService {
  public constructor() {
    super("/user/authentication");
  }

  private async _loginAsync(
    credentials: tLoginCredentials,
  ): Promise<tSuccessOneService<tUserModel>> {
    const parsedCredentials = zLoginCredentials.parse(credentials);

    const data = await this._fetch.post("/user/authentication/login", parsedCredentials);
    if (data.ok === false) {
      const dataBody: tFailedModel = await data.json();
      throw new ClsErrorService(
        data.status,
        data.statusText,
        dataBody.message,
        dataBody.issues,
      );
    }

    const dataBody: tSuccessOneModel<tUserModel> = await data.json();
    return {
      isSuccess: true,
      statusCode: data.status,
      statusText: data.statusText,
      data: dataBody.data,
    };
  }
  public async loginAsync(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<tUserModel>> {
    return this._catch<tSuccessOneService<tUserModel>>(async () =>
      this._loginAsync(credentials),
    );
  }
}

export { ClsAuthenticationService };
