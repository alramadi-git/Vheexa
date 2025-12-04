import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication";

import { tMemberModel } from "@/models/partner/member";

import { tSuccessOneModel } from "@/models/general/success";
import { tFailedModel } from "@/models/general/failed";

import {
  tSuccessOneService,
  tResponseOneService,
  ClsErrorService,
  ClsAbstractService,
} from "@/services/service";

class ClsAuthenticationService extends ClsAbstractService {
  public constructor() {
    super("/partner/authentication");
  }

  private async _loginAsync(
    credentials: tLoginCredentials,
  ): Promise<tSuccessOneService<tMemberModel>> {
    const credentialsResult = zLoginCredentials.parse(credentials);
    const response = await fetch(`${this._url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentialsResult),
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

  public async loginAsync(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<tMemberModel>> {
    return this.catcher<tSuccessOneService<tMemberModel>>(
      async () => await this._loginAsync(credentials),
    );
  }
}

export { ClsAuthenticationService };
