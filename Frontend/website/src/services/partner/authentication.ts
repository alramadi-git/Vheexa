import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/register-credentials";
import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/login-credentials";

import { tMemberModel } from "@/models/partner/member";

import { tSuccessOneModel } from "@/models/success";
import { tFailedModel } from "@/models/failed";

import {
  tSuccessOneService,
  tResponseOneService,
  ClsAbstractService,
  ClsErrorService,
} from "@/services/service";

class ClsAuthenticationService extends ClsAbstractService {
  public constructor() {
    super("/partner/authentication");
  }

  private async _registerAsync(
    credentials: tRegisterCredentials,
  ): Promise<tSuccessOneService<tMemberModel>> {
    const parsedCredentials = zRegisterCredentials.parse(credentials);

    const data = await this._fetch.post("/register", parsedCredentials);
    if (!data.ok) {
      const dataBody: tFailedModel = await data.json();
      throw new ClsErrorService(
        data.status,
        data.statusText,
        dataBody.message,
        dataBody.issues,
      );
    }

    const dataBody: tSuccessOneModel<tMemberModel> = await data.json();
    return {
      isSuccess: true,
      statusCode: data.status,
      statusText: data.statusText,
      data: dataBody.data,
    };
  }
  public async registerAsync(
    credentials: tRegisterCredentials,
  ): Promise<tResponseOneService<tMemberModel>> {
    return this.catcher<tSuccessOneService<tMemberModel>>(
      async () => await this._registerAsync(credentials),
    );
  }

  private async _loginAsync(
    credentials: tLoginCredentials,
  ): Promise<tSuccessOneService<tMemberModel>> {
    const parsedCredentials = zLoginCredentials.parse(credentials);

    const date = await this._fetch.post("/login", parsedCredentials);
    if (!date.ok) {
      const dataBody: tFailedModel = await date.json();
      throw new ClsErrorService(
        date.status,
        date.statusText,
        dataBody.message,
        dataBody.issues,
      );
    }

    const dataBody: tSuccessOneModel<tMemberModel> = await date.json();
    return {
      isSuccess: true,
      statusCode: date.status,
      statusText: date.statusText,
      data: dataBody.data,
    };
  }
  public async loginAsync(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<tMemberModel>> {
    return this.catcher<tSuccessOneService<tMemberModel>>(
      async () => await this._loginAsync(credentials),
    );
  }
}

export { ClsAuthenticationService };
